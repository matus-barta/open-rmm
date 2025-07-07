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
	import { afterNavigate, invalidateAll } from '$app/navigation';
	import { get_computers_in_org_unit, get_org_unit_name } from '$lib/db/orgUnit';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	let orgUnitName = $state('');

	const ConfigBarOptions = {
		AddComputer: 'Add Computer',
		ComputerInfo: 'Computer Info'
	};

	type Computer = {
		IsAllowed: boolean | null;
		Uuid: string | null;
		IsAdded: boolean | null;
		SystemInfo:
			| {
					ComputerName: string | null | undefined;
					PendingReboot: boolean | null | undefined;
					LastBootupTime: string | null | undefined;
					OsName: string | null | undefined;
					Type: string | null | undefined;
			  }
			| null
			| undefined;
	};

	let _configEnabled = $state(false);
	let _configBarOption: string = $state('');
	let _computer: Computer | undefined = $state();

	function showConfigBar(configBarOption: string, computer?: Computer) {
		_configEnabled = true;
		_configBarOption = configBarOption;
		_computer = computer;
	}

	afterNavigate(async () => {
		orgUnitName = await get_org_unit_name(data.supabase, $page.params.slug);
	});
</script>

<svelte:head>
	<title>Open RMM - {orgUnitName}</title>
</svelte:head>

<div class="relative flex h-full w-full flex-col pt-1">
	{#if _configEnabled}
		<!--TODO: implement this to the component itself-->
		<ConfigBar
			title={_configBarOption}
			on:close={() => {
				_configEnabled = false;
			}}
		>
			{#if _configBarOption == ConfigBarOptions.AddComputer}
				<AddComputer supabaseClient={data.supabase} />
			{:else if _configBarOption == ConfigBarOptions.ComputerInfo}
				<ComputerInfo computer={_computer} />
				<!--TODO: or just slap ID to it and load it in the component-->
			{/if}
		</ConfigBar>
	{/if}

	<div class="flex h-8 w-full flex-row gap-5 px-2">
		<button
			class="button-ish"
			onclick={() => {
				showConfigBar(ConfigBarOptions.AddComputer);
			}}>Add Computer</button
		>
		<button class="button-ish" onclick={invalidateAll}>Refresh</button>
		<button class="button-ish">...</button>
	</div>
	<div class="flex w-full flex-col pt-5">
		<table>
			<thead class="bg-slate text-sm">
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
							class="h-5 w-5"
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
				{#await get_computers_in_org_unit(data.supabase, $page.params.slug) then computers}
					{#each computers as computer}
						<tr
							class="border-b border-gray-500 font-light hover:bg-gray-200"
							onclick={() => {
								showConfigBar(ConfigBarOptions.ComputerInfo, {
									Uuid: computer.uuid,
									IsAdded: computer.is_added,
									IsAllowed: computer.is_allowed,
									SystemInfo: {
										ComputerName: computer.system_info?.computer_name,
										LastBootupTime: computer.system_info?.last_bootup_time,
										OsName: computer.system_info?.os_name,
										PendingReboot: computer.system_info?.pending_reboot,
										Type: computer.system_info?.machine_type
									}
								});
							}}
						>
							<td>
								<OsMark os={computer.system_info?.os_name} />
							</td>
							<td>
								<TypeMark type={computer.system_info?.machine_type} />
							</td>
							<td class="flex items-center justify-center">
								{computer.system_info?.computer_name}
							</td>
							<td>
								{'description'}
							</td>
							<td>
								<BoolMark is={computer.is_added} />
							</td>
							<td>
								<BoolMark is={computer.is_allowed} />
							</td>
							<td>
								{'AV'}
							</td>
							<td>
								{'disk'}
							</td>
							<td>
								<BoolMark is={false} />
							</td>
							<td>
								<BoolMark is={computer.system_info?.pending_reboot} />
							</td>
							<td class="flex items-center justify-center">
								{formatIsoDateTime(computer.system_info?.last_bootup_time)}
							</td>
						</tr>
					{/each}
				{/await}
			</tbody>
		</table>
	</div>
</div>
