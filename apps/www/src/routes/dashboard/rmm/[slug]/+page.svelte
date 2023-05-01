<script lang="ts">
	import { page } from '$app/stores';
	import AddComputer from '$lib/components/AddComputer.svelte';
	import BoolMark from '$lib/components/BoolMark.svelte';
	import ConfigBar from '$lib/components/ConfigBar.svelte';
	import OsMark from '$lib/components/OsMark.svelte';
	import TypeMark from '$lib/components/TypeMark.svelte';
	import formatIsoDateTime from '$lib/utils/formatDateTime';
	import type { PageData } from './$types';
	export let data: PageData;

	let configEnabled = false;
</script>

<svelte:head>
	<title>Open RMM - {$page.params.slug}</title>
</svelte:head>

<div class="flex flex-col w-full pt-1 relative h-full">
	{#if configEnabled}
		<ConfigBar
			title="Add Computer"
			on:close={() => {
				configEnabled = false;
			}}
		>
			<AddComputer />
		</ConfigBar>
	{/if}

	<div class="w-full h-8 flex flex-row gap-5 px-2">
		<button
			class="button-ish"
			on:click={() => {
				configEnabled = true;
			}}>Add Computer</button
		>
		<button class="button-ish">Refresh</button>
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
				{#each data.computers as computer}
					<tr class="border-b border-dark-color-more-lighter font-light">
						<td>
							{#if computer.SystemInfo != null}
								<OsMark os={computer.SystemInfo.OsName} />
							{/if}
						</td>
						<td>
							{#if computer.SystemInfo != null}
								<TypeMark type={computer.SystemInfo.Type} />
							{/if}
						</td>
						<td class="flex justify-center items-center">
							{#if computer.SystemInfo != null}
								{computer.SystemInfo.ComputerName}
							{/if}
						</td>
						<td>
							{''}
						</td>
						<td>
							<BoolMark is={computer.IsAdded} />
						</td>
						<td>
							<BoolMark is={computer.IsAllowed} />
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
							<BoolMark
								is={computer.SystemInfo != null ? computer.SystemInfo.PendingReboot : null}
							/>
						</td>
						<td class="flex justify-center items-center">
							{#if computer.SystemInfo != null}
								{formatIsoDateTime(computer.SystemInfo.LastBootupTime)}
							{/if}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
