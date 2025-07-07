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

<div class="flex h-full w-full flex-col justify-between px-2 py-4">
	{#await get_org_units(supabaseClient) then data}
		<div class="flex flex-col gap-2">
			<label>
				One Time Key
				<input
					class="h-6 w-full rounded-lg border-[0.5px] p-1 font-mono text-xs"
					type="text"
					disabled
					bind:value={otk}
				/>
				<button class="button-ish rounded-lg px-4 py-2" disabled={otk == ''} use:copy={otk}
					>Copy</button
				>
				<!-- svelte-ignore a11y_label_has_associated_control -->
				<label>{info}</label>
			</label>
			<label>
				Org Unit
				<select
					class="bg-gray m-1 rounded-lg p-[0.5px] font-mono text-sm"
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
		<button onclick={addComputer} class="button-ish rounded-lg py-2">Create</button>
	{/await}
</div>
