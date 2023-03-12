<script lang="ts">
	import { page } from '$app/stores';
	export let link: string;

	$: selected = $page.url.pathname.includes(link);
</script>

{#if selected}
	<a href={link} class="navButton selected button-ish">
		<slot />
	</a>
{:else}
	<a href={link} class="navButton button-ish">
		<slot />
	</a>
{/if}

<style>
	.navButton {
		@apply p-4 border-l-2 border-transparent;
	}

	.selected {
		@apply border-accent-color bg-dark-color-lighter;
	}
</style>
