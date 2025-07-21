<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import DialogBtn from '$lib/components/dialogButton.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import formatIsoDateTime from '$lib/utils/formatDateTime';
	import type { PageProps } from './$types';
	import Os from '$lib/components/Marks/os.svelte';
	import MachineType from '$lib/components/Marks/machineType.svelte';
	import Bool from '$lib/components/Marks/bool.svelte';
	import DrawerButton from '$lib/components/drawerButton.svelte';
	import { SquarePen } from '@lucide/svelte';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Open RMM - {data.orgUnitName}</title>
</svelte:head>

{#snippet orgUnitDialog()}
	<div class="grid gap-4 py-4">
		<div class="grid grid-cols-4 items-center gap-4">
			<Label for="name" class="text-right">Name</Label>
			<Input id="name" value="Pedro Duarte" class="col-span-3" />
		</div>
		<div class="grid grid-cols-4 items-center gap-4">
			<Label for="username" class="text-right">Username</Label>
			<Input id="username" value="@peduarte" class="col-span-3" />
		</div>
	</div>
{/snippet}

{#snippet addComputerDialog()}
	<div class="grid flex-1 auto-rows-min gap-6 px-4">
		<div class="grid gap-3">
			<Label for="name" class="text-right">Name</Label>
			<Input id="name" value="Pedro Duarte" />
		</div>
		<div class="grid gap-3">
			<Label for="username" class="text-right">Username</Label>
			<Input id="username" value="@peduarte" />
		</div>
	</div>
{/snippet}

<div class="flex h-full flex-col gap-2">
	<menubar class="flex h-auto flex-row justify-between rounded-lg border-2 p-1">
		<leftbar class="flex flex-row">
			<DrawerButton
				variant="ghost"
				size="sm"
				title="Add Computer"
				description="Add new computer."
				content={addComputerDialog}
			/>
			<Button size="sm" variant="ghost" onclick={invalidateAll}>Refresh</Button>
			<Button size="sm" variant="ghost">...</Button>
		</leftbar>

		<DialogBtn
			variant="ghost"
			size="sm"
			title="Edit Org Unit"
			description="Edit Org Unit properties."
			content={orgUnitDialog}
			Icon={SquarePen}
		/>
	</menubar>

	<div class="flex-1 rounded-lg border-2">
		<Table.Root>
			<Table.Header class="bg-secondary/50">
				<Table.Row>
					<Table.Head class="text-center">OS</Table.Head>
					<Table.Head class="text-center">Type</Table.Head>
					<Table.Head>Name</Table.Head>
					<Table.Head>Description</Table.Head>
					<Table.Head class="text-center">Is Added</Table.Head>
					<Table.Head class="text-center">Is Allowed</Table.Head>
					<Table.Head>AV</Table.Head>
					<Table.Head>Disk</Table.Head>
					<Table.Head class="text-center">Pending Updates</Table.Head>
					<Table.Head class="text-center">Pending Reboot</Table.Head>
					<Table.Head>Last Bootup Time</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each data.computers as computer}
					<Table.Row>
						<Table.Cell><Os os={computer.system_info?.os_name} /></Table.Cell>
						<Table.Cell><MachineType type={computer.system_info?.machine_type} /></Table.Cell>
						<Table.Cell>{computer.system_info?.computer_name}</Table.Cell>
						<Table.Cell></Table.Cell>
						<Table.Cell><Bool is={computer.is_added} /></Table.Cell>
						<Table.Cell><Bool is={computer.is_allowed} /></Table.Cell>
						<Table.Cell></Table.Cell>
						<Table.Cell></Table.Cell>
						<Table.Cell></Table.Cell>
						<Table.Cell><Bool is={computer.system_info?.pending_reboot} /></Table.Cell>
						<Table.Cell>{formatIsoDateTime(computer.system_info?.last_bootup_time)}</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
</div>
