<script lang="ts">
	import { page } from '$app/stores';
	import IconAdd from '$lib/icons/IconAdd.svelte';

	type T = $$Generic<{ OrgUnitName: string }>; //TODO: make this goneric - need to update DB :-/

	export let options: T[];

	//TODO: bo able have selected options
</script>

<div class="flex flex-col justify-between w-64 bg-dark-color">
	<div class="flex flex-col">
		{#each options as option}
			<a class="button-ish option" href="/dashboard/rmm/{option.OrgUnitName}"
				>{option.OrgUnitName}</a
			>
		{/each}
	</div>
	<div class="bg-darker-color h-11">
		<a
			href="/dashboard/rmm/addorgunit/"
			class="flex flex-row button-ish font-light hover:bg-transparent justify-center items-center space-x-2 h-full hover:text-accent-color hover:stroke-accent-color"
		>
			<IconAdd size="25" />
			<span>Add OrgUnit</span>
		</a>
	</div>
</div>

<style>
	.option {
		@apply px-4 py-2 uppercase text-center;
	}
</style>
