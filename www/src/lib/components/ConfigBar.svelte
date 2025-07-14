<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { invalidateAll } from '$app/navigation';

	const dispatch = createEventDispatcher();
	const close = () => dispatch('close');
	const refresh = () => invalidateAll(); //TODO: invalidate only config bar

	interface Props {
		title: string;
		children?: import('svelte').Snippet;
	}

	let { title, children }: Props = $props();
</script>

<div class="absolute top-0 right-0 flex h-full w-[512px] flex-col bg-gray-700 px-2 pt-1 pb-5">
	<div class="flex justify-end pb-8">
		<button onclick={refresh} class="button-ish p-1">O</button>
		<button onclick={close} class="button-ish p-1">X</button>
	</div>
	<h1 class="text-right">{title}</h1>
	{@render children?.()}
</div>
