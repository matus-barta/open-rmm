<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';
	import { invalidateAll } from '$app/navigation';

	export let data;
	let { supabaseClient } = data;
	$: ({ supabaseClient } = data);

	onMount(() => {
		const {
			data: { subscription }
		} = supabaseClient.auth.onAuthStateChange(() => {
			invalidateAll();
		});

		return () => {
			subscription.unsubscribe();
		};
	});
</script>

<slot />
