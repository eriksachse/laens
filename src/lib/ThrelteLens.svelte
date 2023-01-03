<script>
  import { Vector2 } from "three";
  import { Pass } from "@threlte/core";
  import { onMount } from "svelte";
  import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass";
  import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
  import { LensPass } from "./LensPass";
  export let factor, factor2, factor3, sqrt;
  let lensPass;
  let bloomPass;
  console.log("hello");
  onMount(() => {
    lensPass = new LensPass();
    bloomPass = new UnrealBloomPass();
    bloomPass.strength = 0.2;
  });
  $: {
    // console.log("color changed", distortion);
    if (lensPass) {
      lensPass.factor = factor;
      lensPass.factor2 = factor2;
      lensPass.factor3 = factor3;
      lensPass.sqrtval = sqrt;
    }
  }
</script>

{#if lensPass}
  <Pass pass={lensPass} />
  <!-- <Pass pass={bloomPass} /> -->
{/if}
