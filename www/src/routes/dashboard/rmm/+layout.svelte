<script lang="ts">
	import SidebarOption from '$lib/components/SidebarOption.svelte';
	import IconAdd from '$lib/icons/IconAdd.svelte';
	import type { LayoutData } from './$types';
	import { error } from '@sveltejs/kit';

	export let data: LayoutData;

	const get_org_units = async () => {
		const { data: org_units, error: db_error } = await data.supabaseClient
			.from('org_units')
			.select('uuid, name, color, icon_id');
		if (!org_units) {
			console.log(db_error);
			throw error(404, db_error);
		} //TODO: log error and show some client friendly msg
		return org_units;
	};

	const get_computer_in_org_unit_count = async (org_unit_uuid: string) => {
		const { count, error: db_error } = await data.supabaseClient
			.from('computers')
			.select('*', { count: 'exact', head: true }) //https://supabase.com/docs/guides/database/sql-to-api
			.eq('org_unit_uuid', org_unit_uuid);
		if (!count) {
			console.log(db_error);
			throw error(500, db_error);
		} //TODO: log error and show some client friendly msg
		return count;
	};
</script>

<div class="flex flex-row mb-auto w-full mx-auto h-full">
	<div class="flex flex-col justify-between w-64 bg-dark-color">
		<div class="flex flex-col">
			{#await get_org_units() then data}
				{#each data as org_unit}
					<SidebarOption
						title={org_unit.name}
						uuid={org_unit.uuid}
						path="/dashboard/rmm/"
						color={org_unit.color}
						icon={org_unit.icon_id}
						count={get_computer_in_org_unit_count(org_unit.uuid)}
					/>
				{/each}
			{/await}
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
