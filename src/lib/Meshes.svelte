<script>
	import { onMount } from 'svelte';
	import { T, MeshInstance, useFrame } from '@threlte/core';
	import {
		Object3D,
		InstancedMesh,
		BoxGeometry,
		MeshStandardMaterial,
		SphereGeometry
	} from 'three';
	import { get } from 'svelte/store';

	const dummy = new Object3D();
	const amount = 50;
	const count = Math.pow(amount, 3);
	let i = 0;
	let mesh;
	let loop = 0;
	let distance;
	let groupposition = 0;
	useFrame(({ camera }) => {
		distance = Math.round(get(camera).position.z / 1);
		if (distance !== loop) {
			loop = distance;
			groupposition++;
		}
	});
	const offset = (amount - 1) / 2;
	let boxsize = 0.6;
	onMount(() => {
		let geometry = new BoxGeometry(boxsize, boxsize, boxsize);
		// let geometry = new SphereGeometry(0.2);
		let material = new MeshStandardMaterial({
			color: 'white',
			roughness: 0
		});
		mesh = new InstancedMesh(geometry, material, count);
		for (let x = 0; x < amount; x++) {
			for (let y = 0; y < amount; y++) {
				for (let z = 0; z < amount; z++) {
					dummy.position.set(offset - x, offset - y, offset - z);
					dummy.updateMatrix();
					mesh.setMatrixAt(i++, dummy.matrix);
				}
			}
		}
	});
</script>

<T.Group position.z={-groupposition - 20}>
	{#if mesh}
		<MeshInstance {mesh} rotation={{ x: 90 * (Math.PI / 180) }} />
	{/if}
</T.Group>
