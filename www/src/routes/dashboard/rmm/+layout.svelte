<script lang="ts">
	import SidebarOption from '$lib/components/SidebarOption.svelte';
	import { get_computer_count_in_org_unit, get_org_units } from '$lib/db/orgUnit';
	import IconAdd from '$lib/icons/IconAdd.svelte';
	import type { LayoutData } from './$types';

	interface Props {
		data: LayoutData;
		children?: import('svelte').Snippet;
	}

	let { data, children }: Props = $props();
</script>

<div class="mx-auto mb-auto flex h-full w-full flex-row">
	<div class="flex w-64 flex-col justify-between bg-gray-800">
		<div class="flex flex-col">
			{#await get_org_units(data.supabase) then org_units}
				{#each org_units as org_unit}
					<SidebarOption
						title={org_unit.name}
						uuid={org_unit.uuid}
						path="/dashboard/rmm/"
						color={org_unit.color}
						icon={org_unit.icon_id}
						count={get_computer_count_in_org_unit(data.supabase, org_unit.uuid)}
					/>
				{/each}
			{/await}
		</div>
		<div class="bg-darker-color h-11">
			<a
				href={'/dashboard/rmm/addorgunit'}
				class="button-ish flex h-full flex-row items-center justify-center space-x-2 font-light hover:bg-transparent hover:stroke-green-600 hover:text-green-600"
			>
				<IconAdd size="25" />
				<span class="text-sm font-light">{'Add Org unit'}</span>
			</a>
		</div>
	</div>
	<div class="w-full">
		{@render children?.()}
	</div>
</div>
