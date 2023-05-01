<script lang="ts">
	import Sidebar from '$lib/components/Sidebar.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	const orgUnits = data.orgUnits.map((orgUnit) => ({
		title: orgUnit.OrgUnitTitle,
		name: orgUnit.OrgUnitName,
		count: orgUnit._count.Computers
	}));
</script>

<div class="flex flex-row mb-auto w-full mx-auto h-full">
	<Sidebar
		options={orgUnits}
		add={{ path: '/dashboard/rmm/addorgunit/', title: 'Add Org. Unit' }}
	/>
	<div class="w-full">
		<slot />
	</div>
</div>

<style>
</style>
