<script lang="ts">
	import { btnColors, btnIcons } from '$lib/iconsList';
	import { Check } from '@lucide/svelte';

	type Props = {
		colorIndex?: number;
		iconIndex?: number;
		callback?: () => void;
		selected?: boolean;
	};
	let { colorIndex, iconIndex, callback, selected }: Props = $props();

	const color =
		colorIndex == undefined ? 'dark:bg-secondary/35 bg-secondary/75' : btnColors[colorIndex];
</script>

<button
	onclick={callback}
	type="button"
	class={`border-background relative m-1 flex border-1 hover:border-3 ${color} h-12 w-12 items-center justify-center rounded-md shadow-xs transition-all`}
>
	<div
		class={`${selected ? '' : 'hidden'} bg-secondary absolute top-[-5px] right-[-5px] h-fit w-fit rounded-lg p-0.5`}
	>
		<Check size="16" />
	</div>
	{#if iconIndex != undefined}
		{@const Icon = btnIcons[iconIndex]}
		<Icon />
	{/if}
</button>
