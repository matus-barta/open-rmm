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
	<div class="group flex relative">
		<a href={link} class="navButton button-ish">
			{@render children?.()}
			<!--TODO: replace with icon selector-->
		</a>
		<span
			class="group-hover:opacity-100 transition-opacity delay-1500 duration-150 ease-in-out bg-dark-color-more-lighter text-grey-color inline-block px-2 py-1 text-sm font-medium rounded-lg shadow-sm absolute left-[74px] opacity-0 m-4 mx-auto"
			>{tooltip}</span
		>
	</div>
{/if}

<style lang="postcss">
	.navButton {
		@apply p-4 border-l-2 border-transparent;
	}

	.selected {
		@apply border-accent-color bg-dark-color-lighter;
	}
</style>
