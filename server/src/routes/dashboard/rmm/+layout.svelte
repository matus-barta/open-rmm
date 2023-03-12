<script lang="ts">
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<div class="flex flex-row mb-auto w-full mx-auto h-full">
	<div class="flex flex-col w-64 bg-dark-color">
		{#each data.orgUnits as orgUnit}
			<a class="button-ish" href="/dashboard/rmm/{orgUnit.OrgUnitName}">{orgUnit.OrgUnitName}</a>
		{/each}
	</div>
	<div class="w-full">
		<slot />
	</div>
</div>

<style>
</style>
