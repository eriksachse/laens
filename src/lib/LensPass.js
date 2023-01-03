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
    factor2: { type: "f", value: 0.0 },
    factor3: { type: "f", value: 1.0 },
    sqrtval: { type: "f", value: 1.0 },
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
      uniform float factor2;
      uniform float factor3;
      uniform float sqrtval;
      uniform vec2 resolution;
      uniform sampler2D tex;
      varying vec2 vUv;
      const float PI = 3.1415926535;

      vec2 computeUV( vec2 uv, float factor, float factor2 ){
        vec2 t = uv - .5;
        float r2 = t.x * t.x + t.y * t.y ;
        float f = 0.;
        if( factor2 == 0.0){
            f = 1. + r2 * factor - abs(factor * 0.2);
        }else{
            f = 1. + r2 * ( (factor - abs(factor * 0.2)) + (factor2 - abs(factor2 * 0.2)) * sqrt( r2 ) * 2.4 );    
        }
        vec2 nUv = f * t + .5;
        nUv.y = 1. - nUv.y;
        return nUv;
    }
      void main() {
        vec2 uv = vUv;
        vec4 red = texture2D( tex, computeUV( uv, factor, factor2 ) ); 
        gl_FragColor = red;
      }
      `,
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
    this.factor3 = 1;
    this.factor2 = 0;
    this.time = 0;
    this.sqrtval = 1;
  }

  render(renderer, writeBuffer, readBuffer, deltaTime, maskActive) {
    const factor = Math.max(0, this.factor);
    this.uniforms["byp"].value = factor ? 0 : 1;
    this.uniforms["tex"].value = readBuffer.texture;
    this.uniforms["time"].value = this.time;
    this.uniforms["factor"].value = this.factor;
    this.uniforms["factor2"].value = this.factor2;
    this.uniforms["factor3"].value = this.factor3;
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
