<script>
	import { Canvas } from '@threlte/core';
	import { World } from '@threlte/rapier';
	import Scene from '$lib/Scene.svelte';
	import ThrelteLens from '$lib/ThrelteLens.svelte';
	import Range from '$lib/Range.svelte';
	let factor = 0;
	let chromation = 0;
	let var1 = 1;
	let sqrt = 1;
</script>

<div class="canvas-wrapper">
	<div id="ui">
		<strong><img src="lens.svg" alt="lens" id="lens" />Läns</strong>
		<div>
			Factor
			<div class="variable-container" />
			<div class="slider-container">
				<Range min={-1} max={1} on:change={(e) => (factor = e.detail.value)} />
			</div>
		</div>
		<div>
			Chromation
			<div class="variable-container" />
			<div class="slider-container">
				<Range min={-1} max={1} on:change={(e) => (chromation = e.detail.value)} />
			</div>
		</div>
		<div>
			Zoom
			<div class="variable-container" />
			<div class="slider-container">
				<Range min={0} max={2} initialValue={1} on:change={(e) => (var1 = e.detail.value)} />
			</div>
		</div>
		<span on:click={() => (sqrt = 0.0)} class="button">pow</span> /
		<span on:click={() => (sqrt = 1.0)} class="button">sqrt</span>
	</div>
	<Canvas>
		<World>
			<Scene>
				<ThrelteLens {factor} {chromation} {var1} {sqrt} />
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
