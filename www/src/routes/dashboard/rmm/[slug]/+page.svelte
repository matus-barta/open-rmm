<script lang="ts">
	import { invalidateAll, onNavigate } from '$app/navigation';
	import DialogBtn from '$lib/components/dialogButton.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import formatIsoDateTime from '$lib/utils/formatDateTime';
	import type { PageProps } from './$types';
	import Os from '$lib/components/marks/os.svelte';
	import MachineType from '$lib/components/marks/machineType.svelte';
	import Bool from '$lib/components/marks/bools.svelte';
	import DrawerButton from '$lib/components/drawerButton.svelte';
	import { Check, ClipboardCopy, RotateCw, SquarePen } from '@lucide/svelte';
	import { add_computer } from '$lib/db/computer';
	import { toast } from 'svelte-sonner';
	import { copyText } from 'svelte-copy';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Checkbox } from '$lib/components/ui/checkbox/index.js';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import log from '$lib/utils/logger';
	import TooltipButton from '$lib/components/tooltipButton.svelte';

	let { data }: PageProps = $props();

	let otk = $state('');
	let selectedOrgUnitUuid = $state('');
	let isAllowed = $state(true);
	let selectedComputer = $state('');

	let copied = $state(false);
	function copyOtk() {
		copyText(otk);
		copied = true;
		toast.info('Coppied!');
		setTimeout(() => {
			copied = false;
		}, 3000);
	}

	async function addComputer() {
		if (selectedOrgUnitUuid == '') {
			toast.error('You must select Org Unit!');
			return;
		}
		otk = await add_computer(data.supabase, selectedOrgUnitUuid, isAllowed)
			.catch((e) => {
				log.error(e.body.message);
			})
			.then((value) => {
				toast.info('Created computer!');
				return value ?? '';
			});
		invalidateAll();
	}

	const triggerContent = $derived(
		data.orgUnits.find((f) => f.orgUnit.uuid == selectedOrgUnitUuid)?.orgUnit.name ??
			'Select an Org Unit'
	);

	onNavigate(() => {
		selectedComputer = '';
	});

	function cleanup() {
		otk = '';
		selectedOrgUnitUuid = '';
	}
</script>

<svelte:head>
	<title>Open RMM - {data.orgUnitName}</title>
</svelte:head>

{#snippet orgUnitDialog()}
	<div class="grid gap-4 py-4">
		<div class="grid grid-cols-4 items-center gap-4">
			<Label for="name" class="text-right">Org Unit Name</Label>
			<Input id="name" value={data.orgUnitName} class="col-span-3" />
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
			<Label for="orgUnit" class="text-right">Org Unit</Label>
			<Select.Root type="single" bind:value={selectedOrgUnitUuid}>
				<Select.Trigger class="w-full">{triggerContent}</Select.Trigger>
				<Select.Content>
					{#each data.orgUnits as { orgUnit } (orgUnit.uuid)}
						<Select.Item value={orgUnit.uuid} label={orgUnit.name}>
							{orgUnit.name}
						</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>
		</div>

		<div class="flex flex-row gap-3">
			<Label for="isAllowed" class="text-right">Is Allowed</Label>
			<Checkbox id="isAllowed" bind:checked={isAllowed} />
		</div>
		<Separator />
		<div class="flex flex-col gap-3">
			<Label for="otk" class="text-right">One Time Key</Label>
			<div class="flex flex-row gap-2">
				<Input id="otk" bind:value={otk} disabled />
				<Button onclick={copyOtk} id="copy" variant="outline" size="icon" disabled={otk == ''}>
					<Check
						class={`${copied ? '' : 'opacity-0'} transition-discrete absolute transition-all`}
					/>

					<ClipboardCopy
						class={`${copied ? 'opacity-0' : ''} transition-discrete absolute transition-all`}
					/>
				</Button>
			</div>
		</div>
	</div>
{/snippet}

{#snippet showComputerDialog()}
	{@const computer = data.computers.find((f) => f.uuid == selectedComputer)}
	<div class="grid flex-1 auto-rows-min gap-6 px-4">
		<div class="grid gap-3">
			<Label for="uuid" class="text-right">UUID</Label>
			<Input id="uuid" value={computer?.uuid} disabled />
		</div>
		<div class="grid grid-cols-2">
			<Label for="isAllowed" class="text-right">Is Allowed</Label>
			<Checkbox id="isAllowed" checked={computer?.is_allowed} disabled />
		</div>
		<div class="grid grid-cols-2">
			<Label for="isAdded" class="text-right">Is Added</Label>
			<Checkbox id="isAdded" checked={computer?.is_added} disabled />
		</div>
		<Separator />
		<div class="grid gap-3">
			<Label for="computerName" class="text-right">Computer Name</Label>
			<Input id="computerName" value={computer?.system_info?.computer_name} disabled />
		</div>
		<div class="grid gap-3">
			<Label for="osName" class="text-right">OS Name</Label>
			<Input id="osName" value={computer?.system_info?.os_name} disabled />
		</div>
		<div class="grid gap-3">
			<Label for="osVesion" class="text-right">OS Version</Label>
			<Input id="osVersion" value={computer?.system_info?.os_version} disabled />
		</div>
		<div class="grid gap-3">
			<Label for="osVesion" class="text-right">Kernel Version</Label>
			<Input id="osVersion" value={computer?.system_info?.kernel_version} disabled />
		</div>
		<div class="grid gap-3">
			<Label for="type" class="text-right">System Type</Label>
			<Input id="type" value={computer?.system_info?.machine_type} disabled />
		</div>
		<Separator />
		<div class="grid grid-cols-2">
			<Label for="pendingReboot" class="text-right">Pending Reboot</Label>
			<Checkbox
				id="PendingReboot"
				disabled
				checked={computer?.system_info?.pending_reboot == null
					? false
					: computer?.system_info?.pending_reboot}
			/>
		</div>
		<div class="grid gap-3">
			<Label for="bootTime" class="text-right">Last Boot Time</Label>
			<Input id="bootTime" value={computer?.system_info?.last_bootup_time} disabled />
		</div>
	</div>
{/snippet}

<div class="flex h-full flex-col gap-2">
	<menubar class="flex h-auto flex-row justify-between rounded-lg border-2 p-1">
		<left class="flex flex-row">
			<DrawerButton
				variant="ghost"
				size="sm"
				title="Add Computer"
				description="Add new computer to selected Org Unit. Don't forget to copy the One Time Key!"
				content={addComputerDialog}
				actionName="Create computer"
				action={addComputer}
				onClosed={cleanup}
			/>
			<showup class="flex flex-row">
				<Separator orientation="vertical" class="mx-1" />
				<DrawerButton
					variant="ghost"
					size="sm"
					title="Computer details"
					description="Computer details"
					content={showComputerDialog}
					disabled={selectedComputer == ''}
				/>

				<Button variant="ghost" size="sm" disabled={selectedComputer == ''}>Connect</Button>
			</showup>
		</left>
		<right class="flex flex-row">
			<TooltipButton
				btnSize="sm"
				side="bottom"
				variant="ghost"
				tooltip="Refresh"
				Icon={RotateCw}
				onclick={invalidateAll}
			/>
			<DialogBtn
				variant="ghost"
				size="sm"
				title="Edit Org Unit"
				description="Edit Org Unit properties."
				content={orgUnitDialog}
				Icon={SquarePen}
				tooltipSide="bottom"
			/>
		</right>
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
					<Table.Row
						data-state={selectedComputer == computer.uuid ? 'selected' : ''}
						onclick={() => (selectedComputer = computer.uuid)}
					>
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
