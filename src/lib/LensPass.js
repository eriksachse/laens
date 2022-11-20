import {
  Mesh,
  OrthographicCamera,
  PlaneBufferGeometry,
  Scene,
  ShaderMaterial,
  UniformsUtils,
  Vector2,
} from "three";

import { Pass } from "./Pass.js";

const LensShader = {
  uniforms: {
    byp: { value: 0 },
    tex: { type: "t", value: null },
    time: { type: "f", value: 0.0 },
    factor: { type: "f", value: 0.0 },
    var1: { type: "f", value: 1.0 },
    sqrtval: { type: "f", value: 1.0 },
    chromation: { type: "f", value: 0.0 },
  },
  vertexShader: `
      varying vec2 vUv;
      void main(){  
        vUv = uv; 
        vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * modelViewPosition;
      }`,
  fragmentShader: `
      uniform int byp;
      uniform float time;
      uniform float factor;
      uniform float chromation;
      uniform float var1;
      uniform float sqrtval;
      uniform vec2 resolution;
      uniform sampler2D tex;
      varying vec2 vUv;

      vec2 computeUV( vec2 uv, float k, float kcube, float var1, float sqrtval ){
        vec2 t = uv - .5;
        float r2 = t.x * t.x + t.y * t.y;
        float f = 1.0;
        if(sqrtval < 0.5){
          f = var1 + t.x * t.x / t.y * t.y * ( k + kcube * pow( t.x * t.x, t.y * t.y) );
        } else{
          f = var1 + r2 * ( k + kcube * sqrt( r2 ) );
        }
        
        vec2 nUv = f * t + .5;
        return nUv;
    }
      void main() {  
        float k = -1.0 * factor * 0.3;
        float kcube = factor * -3.;
        
        float red = texture( tex, computeUV( vUv, k + chromation, kcube, var1, sqrtval ) ).r; 
        float green = texture( tex, computeUV( vUv, k, kcube, var1, sqrtval ) ).g; 
        float blue = texture( tex, computeUV( vUv, k - chromation, kcube, var1, sqrtval ) ).b; 
        float alpha = texture( tex, computeUV( vUv, k, kcube, var1, sqrtval ) ).a; 
        
        gl_FragColor = vec4( red, green, blue, alpha );
      }`,
};

//
//
//
//

export class LensPass extends Pass {
  constructor(dt_size = 64) {
    super();
    this.uniforms = UniformsUtils.clone(LensShader.uniforms);
    this.material = new ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: LensShader.vertexShader,
      fragmentShader: LensShader.fragmentShader,
    });
    this.camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.scene = new Scene();
    this.quad = new Mesh(new PlaneBufferGeometry(2, 2), null);
    this.quad.frustumCulled = false; // Avoid getting clipped
    this.scene.add(this.quad);
    this.factor = 0;
    this.var1 = 1;
    this.chromation = 0;
    this.time = 0;
    this.sqrtval = 1;
  }

  render(renderer, writeBuffer, readBuffer, deltaTime, maskActive) {
    const factor = Math.max(0, this.factor);
    this.uniforms["byp"].value = factor ? 0 : 1;
    this.uniforms["tex"].value = readBuffer.texture;
    this.uniforms["time"].value = this.time;
    this.uniforms["factor"].value = this.factor;
    this.uniforms["chromation"].value = this.chromation;
    this.uniforms["var1"].value = this.var1;
    this.uniforms["sqrtval"].value = this.sqrtval;
    this.time += 0.05;
    this.quad.material = this.material;
    if (this.renderToScreen) {
      renderer.setRenderTarget(null);
      renderer.render(this.scene, this.camera);
    } else {
      renderer.setRenderTarget(writeBuffer);
      if (this.clear) renderer.clear();
      renderer.render(this.scene, this.camera);
    }
  }
}
