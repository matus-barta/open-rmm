<script lang="ts">
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
	import Form from './form.svelte';
</script>

<svelte:head>
	<title>Open RMM - Add Org Unit</title>
</svelte:head>

<div class="flex flex-col gap-2 p-4">
	<Form {data} />
</div>
