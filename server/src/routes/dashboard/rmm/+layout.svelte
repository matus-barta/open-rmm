<script lang="ts">
	import Sidebar from '$lib/components/Sidebar.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<div class="flex flex-row mb-auto w-full mx-auto h-full">
	<Sidebar options={data.orgUnits} />
	<div class="w-full">
		<slot />
	</div>
</div>

<style>
</style>
