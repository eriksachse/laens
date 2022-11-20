<script lang="ts">
	import { Vector2 } from 'three';
	import { Pass } from '@threlte/core';
	import { onMount } from 'svelte';
	import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass';
	import { LensPass } from './LensPass';
	export let factor, chromation, var1, sqrt;
	let lensPass;
	console.log('hello');
	onMount(() => {
		lensPass = new LensPass();
	});
	$: {
		// console.log("color changed", distortion);
		if (lensPass) {
			lensPass.factor = factor;
			lensPass.chromation = chromation;
			lensPass.var1 = var1;
			lensPass.sqrtval = sqrt;
		}
	}
</script>

{#if lensPass}
	<Pass pass={lensPass} />
{/if}
