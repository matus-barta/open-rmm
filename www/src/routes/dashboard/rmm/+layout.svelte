<script lang="ts">
	import OrgUnitButton from '$lib/components/orgUnitButton.svelte';
	import type { LayoutData } from './$types';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Grid2X2Plus } from '@lucide/svelte';

	interface Props {
		data: LayoutData;
		children?: import('svelte').Snippet;
	}

	let { data, children }: Props = $props();
</script>

<div class="mx-auto mb-auto flex h-full flex-row">
	<div class="bg-primary-foreground border-r-1 flex w-72 flex-col justify-between">
		<div class="flex flex-1 flex-col overflow-y-auto p-2">
			{#each data.orgUnits as { orgUnit, count }}
				<OrgUnitButton {orgUnit} {count} />
			{/each}
		</div>

		<Button variant="default" href="/dashboard/rmm/addorgunit" class="mx-6 my-4 p-5">
			<Grid2X2Plus />
			<span class="text-sm font-light">Add Org unit</span></Button
		>
	</div>
	<div class="flex-1">
		{@render children?.()}
	</div>
</div>
