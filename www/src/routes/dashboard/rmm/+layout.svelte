<script lang="ts">
	import SidebarOption from '$lib/components/SidebarOption.svelte';
	import IconAdd from '$lib/icons/IconAdd.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<div class="flex flex-row mb-auto w-full mx-auto h-full">
	<div class="flex flex-col justify-between w-64 bg-dark-color">
		<div class="flex flex-col">
			{#each data.org_unit_with_count as org_unit}
				<SidebarOption
					title={org_unit.name}
					id={org_unit.id}
					path="/dashboard/rmm/"
					count={org_unit.computer_count}
				/>
			{/each}
		</div>
		<div class="bg-darker-color h-11">
			<a
				href={'/dashboard/rmm/addorgunit'}
				class="flex flex-row button-ish font-light hover:bg-transparent justify-center items-center space-x-2 h-full hover:text-accent-color hover:stroke-accent-color"
			>
				<IconAdd size="25" />
				<span class="text-sm font-light">{'Add Org unit'}</span>
			</a>
		</div>
	</div>
	<div class="w-full">
		<slot />
	</div>
</div>
