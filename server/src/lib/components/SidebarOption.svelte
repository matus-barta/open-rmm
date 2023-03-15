<script lang="ts">
	import { page } from '$app/stores';

	export let title: string;
	export let name: string;
	export let path: string;

	$: selected = $page.url.pathname.includes(name);
</script>

<a
	class="button-ish option {selected
		? 'bg-dark-color-more-lighter !text-grey-color-more-lighter'
		: 'bg-transparent'}"
	href="{path}{name}">{title}</a
>

<style>
	.option {
		@apply px-4 py-2 text-center;
	}
</style>
