<script lang="ts">
	import { add_computer } from '$lib/db/computer';
	import type { Database } from '$lib/db/database.types';
	import { get_org_units } from '$lib/db/orgUnit';
	import type { SupabaseClient } from '@supabase/supabase-js';
	import { copy } from 'svelte-copy';

	export let supabaseClient: SupabaseClient<Database>;

	let otk: string = '';
	let isAllowed: boolean = true;
	let selectedOrgUnitUuid: string;

	let info: string = '';
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
					use:copy={otk}
					on:svelte-copy={() => copiedInfo()}>Copy</button
				>
				<!-- svelte-ignore a11y-label-has-associated-control -->
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
		<button on:click={addComputer} class="button-ish py-2 rounded-lg bg-dark-color">Create</button>
	{/await}
</div>
