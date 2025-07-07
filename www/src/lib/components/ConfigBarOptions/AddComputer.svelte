<script lang="ts">
	import { add_computer } from '$lib/db/computer';
	import type { Database } from '$lib/db/database.types';
	import { get_org_units } from '$lib/db/orgUnit';
	import type { SupabaseClient } from '@supabase/supabase-js';
	import { copy } from 'svelte-copy';

	interface Props {
		supabaseClient: SupabaseClient<Database>;
	}

	let { supabaseClient }: Props = $props();

	let otk: string = $state('');
	let isAllowed: boolean = $state(true);
	let selectedOrgUnitUuid: string = $state('');

	let info: string = $state('');
	function copiedInfo() {
		info = 'Copied!';
		setTimeout(() => {
			info = '';
		}, 3000);
	}

	async function addComputer() {
		otk = await add_computer(supabaseClient, selectedOrgUnitUuid, isAllowed).then((value) => {
			return value ?? '';
		});
	}
</script>

<div class="w-full h-full px-2 py-4 flex flex-col justify-between">
	{#await get_org_units(supabaseClient) then data}
		<div class="flex flex-col gap-2">
			<label>
				One Time Key
				<input
					class="rounded-lg w-full border-[0.5px] font-mono text-xs h-6 p-1"
					type="text"
					disabled
					bind:value={otk}
				/>
				<button
					class="button-ish py-2 rounded-lg bg-dark-color px-4 disabled:bg-darkest-color"
					disabled={otk == ''}
					use:copy={otk}>Copy</button
				>
				<!-- svelte-ignore a11y_label_has_associated_control -->
				<label>{info}</label>
			</label>
			<label>
				Org Unit
				<select
					class="bg-dark-color-lighter m-1 font-mono text-sm p-[0.5px] rounded-lg"
					bind:value={selectedOrgUnitUuid}
				>
					{#each data as orgUnit}
						<option value={orgUnit.uuid}>{orgUnit.name}</option>
					{/each}
				</select>
			</label>

			<label
				>Is Allowed
				<input type="checkbox" bind:checked={isAllowed} />
			</label>
		</div>
		<button onclick={addComputer} class="button-ish py-2 rounded-lg bg-dark-color">Create</button>
	{/await}
</div>
