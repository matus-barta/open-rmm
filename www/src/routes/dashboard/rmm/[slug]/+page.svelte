<script lang="ts">
	import OsMark from '$lib/components/Marks/OsMark.svelte';
	import TypeMark from '$lib/components/Marks/TypeMark.svelte';
	import BoolMark from '$lib/components/Marks/BoolMark.svelte';

	import ConfigBar from '$lib/components/ConfigBar.svelte';
	import AddComputer from '$lib/components/ConfigBarOptions/AddComputer.svelte';
	import ComputerInfo from '$lib/components/ConfigBarOptions/ComputerInfo.svelte';

	import formatIsoDateTime from '$lib/utils/formatDateTime';

	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { invalidateAll } from '$app/navigation';

	export let data: PageData;

	enum ConfigBarOptions {
		AddComputer = 'Add Computer',
		ComputerInfo = 'Computer Info'
	}

	type Computer = {
		IsAllowed: boolean;
		Uuid: string | null;
		CreatedAt: string;
		IsAdded: boolean;
		SystemInfo: {
			ComputerName: string | undefined;
			PendingReboot: boolean | undefined | null;
			LastBootupTime: string | undefined;
			OsName: string | undefined;
			Type: string | undefined | null;
		} | null;
	};

	let _configEnabled = false;
	let _configBarOption: ConfigBarOptions;
	let _computer: Computer | undefined;

	function showConfigBar(configBarOption: ConfigBarOptions, computer?: Computer) {
		_configEnabled = true;
		_configBarOption = configBarOption;
		_computer = computer;
	}
</script>

<svelte:head>
	<title>Open RMM - {$page.params.slug}</title>
</svelte:head>

<div class="flex flex-col w-full pt-1 relative h-full">
	{#if _configEnabled}
		<!--TODO: implement this to the component itself-->
		<ConfigBar
			title={_configBarOption}
			on:close={() => {
				_configEnabled = false;
			}}
		>
			{#if _configBarOption == ConfigBarOptions.AddComputer}
				<AddComputer />
			{:else if _configBarOption == ConfigBarOptions.ComputerInfo}
				<ComputerInfo computer={_computer} />
				<!--TODO: or just slap ID to it and load it in the component-->
			{/if}
		</ConfigBar>
	{/if}

	<div class="w-full h-8 flex flex-row gap-5 px-2">
		<button
			class="button-ish"
			on:click={() => {
				showConfigBar(ConfigBarOptions.AddComputer);
			}}>Add Computer</button
		>
		<button class="button-ish" on:click={invalidateAll}>Refresh</button>
		<button class="button-ish">...</button>
	</div>
	<div class="w-full flex flex-col pt-5">
		<table>
			<thead class="text-sm bg-dark-color-more-lighter">
				<tr>
					<th class="font-normal"> OS </th>
					<th class="font-normal"> Type </th>
					<th class="font-normal"> Name </th>
					<th class="font-normal"> Description </th>
					<th class="font-normal"> Is Added </th>
					<th class="font-normal"> Is Allowed </th>
					<th class="font-normal">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-5 h-5"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z"
							/>
						</svg>
					</th>
					<th class="font-normal"> Disk </th>
					<th class="font-normal"> Pending Updates </th>
					<th class="font-normal"> Pending Reboot </th>
					<th class="font-normal"> Last Bootup Time </th>
				</tr>
			</thead>
			<tbody class="text-xs">
				{#each data.computer as computer}
					<tr
						class="border-b border-dark-color-more-lighter font-light hover:bg-dark-color-more-lighter"
						on:click={() => {
							showConfigBar(ConfigBarOptions.ComputerInfo, {
								Uuid: computer.uuid,
								CreatedAt: computer.created_at,
								IsAdded: computer.is_added,
								IsAllowed: computer.is_allowed,
								SystemInfo: {
									ComputerName: undefined,
									LastBootupTime: undefined,
									OsName: undefined,
									PendingReboot: undefined,
									Type: undefined
								}
							});
						}}
					>
						<td>
							<OsMark os={'computer.SystemInfo.OsName'} />
						</td>
						<td>
							<TypeMark type={'computer.SystemInfo.Type'} />
						</td>
						<td class="flex justify-center items-center">
							{'computer.SystemInfo.ComputerName'}
						</td>
						<td>
							{''}
						</td>
						<td>
							<BoolMark is={true} />
						</td>
						<td>
							<BoolMark is={true} />
						</td>
						<td>
							{''}
						</td>
						<td>
							{''}
						</td>
						<td>
							{''}
						</td>
						<td>
							<BoolMark is={true} />
						</td>
						<td class="flex justify-center items-center">
							{"formatIsoDateTime('')"}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
