<script lang="ts">
	import { page } from '$app/stores';
	import IconHome from '$lib/icons/IconHome.svelte';

	export let title: string;
	export let name: string;
	export let path: string;
	export let count: number;

	$: selected = $page.url.pathname.includes(name);
</script>

<a class="option {selected ? 'bg-dark-color-more-lighter' : 'bg-transparent'}" href="{path}{name}">
	<div class="flex flex-row items-center gap-2">
		<div class="bg-accent-2-color-lighter rounded-md p-1 !stroke-grey-color-more-lighter">
			<IconHome stroke={2} size="20" />
		</div>
		<span class="m-0 p-0">{title}</span>
	</div>
	<span>{count}</span>
</a>

<style>
	.option {
		@apply flex flex-row items-center justify-between px-2 py-1 mx-2 my-1 rounded-md font-normal tracking-normal text-sm text-grey-color-more-lighter;
	}
	:hover.option {
		@apply bg-dark-color-lighter;
	}
</style>
