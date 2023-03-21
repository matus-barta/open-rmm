<script lang="ts">
	import { page } from '$app/stores';
	import BoolMark from '$lib/components/BoolMark.svelte';
	import OsMark from '$lib/components/OsMark.svelte';
	import TypeMark from '$lib/components/TypeMark.svelte';
	import formatIsoDateTime from '$lib/utils/formatDateTime';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<svelte:head>
	<title>Open RMM - {$page.params.slug}</title>
</svelte:head>

<div class="flex flex-col w-full pt-5">
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
						{#if computer.SystemInfos.length > 0}
							<OsMark os={computer.SystemInfos[0].OsName} />
						{/if}
					</td>
					<td>
						{#if computer.SystemInfos.length > 0}
							<TypeMark type={computer.SystemInfos[0].Type} />
						{/if}
					</td>
					<td class="flex justify-center items-center">
						{#if computer.SystemInfos.length > 0}
							{computer.SystemInfos[0].ComputerName}
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
							is={computer.SystemInfos.length > 0 ? computer.SystemInfos[0].PendingReboot : null}
						/>
					</td>
					<td class="flex justify-center items-center">
						{#if computer.SystemInfos.length > 0}
							{formatIsoDateTime(computer.SystemInfos[0].LastBootupTime)}
						{/if}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
