import adapter from '@sveltejs/adapter-auto';
import { preprocessThrelte } from '@threlte/preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter()
	},

	// For more information on configuring/extending preprocessThrelte:
	// https://threlte.xyz/preprocess/preprocessThrelte#configuration
	preprocess: preprocessThrelte({
		extensions: {
			// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
			'three/examples/jsm/controls/OrbitControls': ['OrbitControls']
		}
	})
};

export default config;
