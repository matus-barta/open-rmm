<script lang="ts">
	import { page } from '$app/stores';
	import IconHome from '$lib/icons/IconHome.svelte';

	interface Props {
		title: string;
		uuid: string;
		path: string;
		icon: number; //TODO: impl icons selection
		color: string | null; //TODO: impl color selection
		count: Promise<number>;
	}

	let { title, uuid, path, icon, color, count }: Props = $props();

	let selected = $derived($page.url.pathname.includes(uuid));
</script>

<a class="option {selected ? 'bg-gray' : 'bg-transparent'}" href="{path}{uuid}">
	<div class="flex flex-row items-center gap-2">
		<div class="bg-blue !stroke-gray rounded-md p-1">
			<IconHome stroke={2} size="20" />
		</div>
		<span class="m-0 p-0">{title}</span>
	</div>
	{#await count then data}
		<span>{data}</span>
	{/await}
</a>

<style lang="postcss">
	@reference "tailwindcss";
	.option {
		@apply mx-2 my-1 flex flex-row items-center justify-between rounded-md px-2 py-1 text-sm font-normal tracking-normal;
	}
</style>
