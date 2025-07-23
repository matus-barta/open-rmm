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
	import { Check, ClipboardCopy, RotateCw, SquarePen } from '@lucide/svelte';
	import { add_computer } from '$lib/db/computer';
	import { toast } from 'svelte-sonner';
	import { copyText } from 'svelte-copy';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Checkbox } from '$lib/components/ui/checkbox/index.js';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import log from '$lib/utils/logger';

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
	}

	const triggerContent = $derived(
		data.orgUnits.find((f) => f.orgUnit.uuid == selectedOrgUnitUuid)?.orgUnit.name ??
			'Select an Org Unit'
	);
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
			/>
			<Button size="sm" variant="ghost">AAAAA</Button>
		</left>
		<right class="flex flex-row">
			<Tooltip.Provider>
				<Tooltip.Root>
					<Tooltip.Trigger>
						<Button size="sm" variant="ghost" onclick={invalidateAll}>
							<RotateCw />
						</Button>
					</Tooltip.Trigger>
					<Tooltip.Content side="bottom">
						<p>Refresh</p>
					</Tooltip.Content>
				</Tooltip.Root>
			</Tooltip.Provider>

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
