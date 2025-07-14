<script lang="ts">
	import OrgUnitButton from '$lib/components/orgUnitButton.svelte';
	import IconAdd from '$lib/icons/IconAdd.svelte';
	import type { LayoutData } from './$types';

	interface Props {
		data: LayoutData;
		children?: import('svelte').Snippet;
	}

	let { data, children }: Props = $props();
</script>

<div class="mx-auto mb-auto flex h-full w-full flex-row">
	<div class="bg-primary-foreground border-r-1 flex w-72 flex-col justify-between">
		<div class="flex flex-col p-2">
			{#each data.orgUnits as { orgUnit, count }}
				<OrgUnitButton {orgUnit} {count} />
			{/each}
		</div>
		<div class="h-11">
			<a
				href={'/dashboard/rmm/addorgunit'}
				class="flex h-full flex-row items-center justify-center space-x-2 font-light hover:bg-transparent hover:stroke-green-600 hover:text-green-600"
			>
				<IconAdd size="25" />
				<span class="text-sm font-light">{'Add Org unit'}</span>
			</a>
		</div>
	</div>
	<div class="w-full">
		{@render children?.()}
	</div>
</div>
