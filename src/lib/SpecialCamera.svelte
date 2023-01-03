<script>
  import { T, OrbitControls, useFrame } from "@threlte/core";
  export let position, scene;
  let rotation = [0, 0, 0];
  useFrame(({ clock }) => {
    rotation[0] = Math.sin(clock.elapsedTime) / 18;
    rotation[1] = Math.cos(clock.elapsedTime) / 12;
    rotation[2] = Math.sin(clock.elapsedTime) / 15;
  });
</script>

<T.PerspectiveCamera
  makeDefault
  fov={55}
  position.z={scene ? position : 0}
  rotation={scene ? rotation : [0, 0, 0]}
/>
