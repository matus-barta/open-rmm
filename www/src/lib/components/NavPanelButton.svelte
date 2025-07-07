<script lang="ts">
	import { page } from '$app/stores';
	interface Props {
		link: string;
		tooltip: string;
		children?: import('svelte').Snippet;
	}

	let { link, tooltip, children }: Props = $props();

	let selected = $derived($page.url.pathname.includes(link));
</script>

{#if selected}
	<a href={link} class="navButton selected button-ish">
		{@render children?.()}
	</a>
{:else}
	<div class="group relative flex">
		<a href={link} class="navButton button-ish">
			{@render children?.()}
			<!--TODO: replace with icon selector-->
		</a>
		<span
			class="delay-1500 bg-gray text-gray-color absolute left-[74px] m-4 mx-auto inline-block rounded-lg px-2 py-1 text-sm font-medium opacity-0 shadow-sm transition-opacity duration-150 ease-in-out group-hover:opacity-100"
			>{tooltip}</span
		>
	</div>
{/if}

<style lang="postcss">
	@reference "tailwindcss";
	.navButton {
		@apply border-l-2 border-transparent p-4;
	}

	.selected {
		@apply border-green-700 bg-gray-700;
	}
</style>
