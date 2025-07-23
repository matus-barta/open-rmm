<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Check, ClipboardCopy } from '@lucide/svelte';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Checkbox } from '$lib/components/ui/checkbox/index.js';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { add_computer } from '$lib/db/computer';
	import { toast } from 'svelte-sonner';
	import { invalidateAll } from '$app/navigation';
	import log from '$lib/utils/logger';
	import { copyText } from 'svelte-copy';
	import type { SupabaseClient } from '@supabase/supabase-js';
	import type { Database } from '$lib/db/database.types';

	let otk = $state('');
	let selectedOrgUnitUuid = $state('');
	let isAllowed = $state(true);

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
		otk = await add_computer(supabase, selectedOrgUnitUuid, isAllowed)
			.catch((e) => {
				log.error(e.body.message);
			})
			.then((value) => {
				toast.info('Created computer!');
				return value ?? '';
			});
		invalidateAll();
	}

	type Props = {
		orgUnits: [orgUnit: { name: string; uuid: string }];
		orgUnitNow?: string;
		supabase: SupabaseClient<Database>;
	};

	let { orgUnits, orgUnitNow, supabase }: Props = $props();

	const triggerContent = $derived(
		orgUnits.find((f) => f.uuid == selectedOrgUnitUuid)?.name ?? 'Select an Org Unit'
	);
</script>

<div class="grid flex-1 auto-rows-min gap-6 px-4">
	<div class="grid gap-3">
		<Label for="orgUnit" class="text-right">Org Unit</Label>
		<Select.Root type="single" bind:value={selectedOrgUnitUuid}>
			<Select.Trigger class="w-full">{triggerContent}</Select.Trigger>
			<Select.Content>
				{#each orgUnits as { uuid, name }}
					<Select.Item value={uuid} label={name}>
						{name}
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
				<Check class={`${copied ? '' : 'opacity-0'} transition-discrete absolute transition-all`} />

				<ClipboardCopy
					class={`${copied ? 'opacity-0' : ''} transition-discrete absolute transition-all`}
				/>
			</Button>
		</div>
	</div>
</div>
