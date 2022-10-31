import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	kit: {
		adapter: adapter({
      		// default options are shown. On some platforms
			// these options are set automatically — see below
			pages: 'build',
			assets: 'build',
			fallback: null,
			precompress: false
    	}),
		// hydrate the <div id="svelte"> element in src/app.html
		prerender: {
            crawl: true,
            enabled: true,
            onError: "continue",
            entries: ['*'],
        },
	},
	extensions: ['.svelte'],
	preprocess: [
		preprocess()
	]
};

export default config;
