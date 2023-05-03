<script lang="ts">
	import { trpc } from '$lib/trpc/client';
	import { page } from '$app/stores';
	import { copy } from 'svelte-copy';

	let otk: string = '';
	let isAllowed: boolean = true;
	let orgUnit: string;

	async function addComputer() {
		otk = (await trpc($page).computers.createOtk.query({ OrgUnit: orgUnit, IsAllowed: isAllowed }))
			.OneTimeKey;
	}

	let promise = getOrgUnits();
	function getOrgUnits() {
		return trpc($page).orgUnits.list.query();
	}

	let info: string = '';
	function copiedInfo() {
		info = 'Copied!';
		setTimeout(() => {
			info = '';
		}, 3000);
	}
</script>

<div class="w-full h-full px-2 py-4 flex flex-col justify-between">
	{#await promise}
		<p>loading</p>
	{:then data}
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
					class="bg-dark-color-lighter m-1 font-mono text-sm p-[0.5px] rounded-lg "
					bind:value={orgUnit}
				>
					{#each data as { OrgUnitName, OrgUnitTitle }}
						<option value={OrgUnitName}>{OrgUnitTitle}</option>
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
