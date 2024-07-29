<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { invalidateAll } from '$app/navigation';

	const dispatch = createEventDispatcher();
	const close = () => dispatch('close');
	const refresh = () => invalidateAll(); //TODO: invalidate only config bar

	export let title: string;
</script>

<div class="flex flex-col px-2 pt-1 pb-5 w-[512px] h-full bg-gray-700 absolute top-0 right-0">
	<div class="flex justify-end pb-8">
		<button on:click={refresh} class="p-1 button-ish">O</button>
		<button on:click={close} class="p-1 button-ish">X</button>
	</div>
	<h1 class="text-right">{title}</h1>
	<slot />
</div>
