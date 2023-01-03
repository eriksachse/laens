<script>
  import Meshes from "./Meshes.svelte";
  import SpecialCamera from "./SpecialCamera.svelte";
  import { Environment } from "@threlte/extras";
  import { T, OrbitControls, useFrame } from "@threlte/core";
  import { onMount } from "svelte";

  export let scene;
  let helper;
  onMount(() => {
    console.log(helper);
  });
  let position = 0;
  useFrame(() => {
    position -= 0.01;
  });
</script>

<slot />

<SpecialCamera position={position} scene={scene} />

{#if scene}
  <Meshes position={position} />

  <T.DirectionalLight color="white" position.x={25} position.z={position} />
  <T.DirectionalLight
    color="red"
    position.x={-25}
    position.y={10}
    position.z={position}
  />
  <T.AmbientLight intensity={0.25} />
{:else}
  <!-- <T.Mesh position={[0, 0, -10]}>
    <T.BoxGeometry />
    <T.MeshNormalMaterial />
  </T.Mesh> -->
  <T.GridHelper
    rotation.x={Math.PI / 2}
    position={[0, 0, -10]}
    args={[10, 20, "white", "white"]}
  />
{/if}
