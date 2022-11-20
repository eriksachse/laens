<script>
	import Meshes from './Meshes.svelte';
	import SpecialCamera from './SpecialCamera.svelte';
	import { Environment } from '@threlte/extras';
	import { T, OrbitControls, useFrame } from '@threlte/core';
	let position = 0;
	useFrame(() => {
		position -= 0.01;
	});
</script>

<slot />

<Meshes {position} />
<SpecialCamera {position} />

<T.DirectionalLight color="white" position.x={25} position.z={position} />
<T.DirectionalLight color="red" position.x={-25} position.y={10} position.z={position} />
<T.AmbientLight intensity={0.25} />
