<script>
  import { Canvas } from "@threlte/core";
  import { World } from "@threlte/rapier";
  import Scene from "$lib/Scene.svelte";
  import ThrelteLens from "$lib/ThrelteLens.svelte";
  import Range from "$lib/Range.svelte";
  let factor = 0;
  let factor2 = 0;
  let factor3 = 1;
  let sqrt = 1;
  let scene = true;
</script>

<div class="canvas-wrapper">
  <div id="ui">
    <div>
      Strength
      <div class="variable-container" />
      <div class="slider-container">
        <Range min={-2} max={2} on:change={(e) => (factor = e.detail.value)} />
      </div>
    </div>
    <div>
      Cube
      <div class="variable-container" />
      <div class="slider-container">
        <Range min={-2} max={2} on:change={(e) => (factor2 = e.detail.value)} />
      </div>
    </div>
    <span on:click={() => (scene = true)} class="button">Scene</span> /
    <span on:click={() => (scene = false)} class="button">Grid</span>
  </div>
  <Canvas>
    <World>
      <Scene scene={scene}>
        <ThrelteLens factor={factor} factor2={factor2} factor3={factor3} />
      </Scene>
    </World>
  </Canvas>
</div>

<style>
  .canvas-wrapper {
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    background: grey;
  }
  .button {
    cursor: pointer;
    user-select: none;
  }
  .slider-container,
  .variable-container {
    display: flex;
    width: 100%;
    gap: 12px;
  }
  .variable-container div {
    width: 50%;
  }
  #ui {
    position: absolute;
    display: inline-block;
    top: 12px;
    left: calc(50% - 120px);
    width: 240px;
    background-color: #f5f5f5;
    /* border: 1px solid #e0e0e0;
    border-radius: 2px; */
    padding: 12px;
    border-radius: 16px;
  }
  #links {
    position: absolute;
    bottom: 12px;
    left: 12px;
  }
  #threlte-logo {
    width: 120px;
  }
  #github-logo {
    width: 70px;
  }
  #lens {
    width: 12px;
    margin: 0px 6px;
  }
</style>
