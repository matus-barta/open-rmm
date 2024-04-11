<script lang="ts">
	import { page } from '$app/stores';
	import IconHome from '$lib/icons/IconHome.svelte';

	export let title: string;
	export let uuid: string;
	export let path: string;
	export let icon: number; //TODO: impl icons selection
	export let color: string | null; //TODO: impl color selection
	export let count: Promise<number>;

	$: selected = $page.url.pathname.includes(uuid);
</script>

<a class="option {selected ? 'bg-dark-color-more-lighter' : 'bg-transparent'}" href="{path}{uuid}">
	<div class="flex flex-row items-center gap-2">
		<div class="bg-accent-2-color-lighter rounded-md p-1 !stroke-grey-color-more-lighter">
			<IconHome stroke={2} size="20" />
		</div>
		<span class="m-0 p-0">{title}</span>
	</div>
	{#await count then data}
		<span>{data}</span>
	{/await}
</a>

<style lang="postcss">
	.option {
		@apply flex flex-row items-center justify-between px-2 py-1 mx-2 my-1 rounded-md font-normal tracking-normal text-sm text-grey-color-more-lighter;
	}
	:hover.option {
		@apply bg-dark-color-lighter;
	}
</style>
