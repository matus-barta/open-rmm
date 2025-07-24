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
	class={`hover:border-3 border-1 border-background relative m-1 flex ${color} shadow-xs h-12 w-12 items-center justify-center rounded-md transition-all`}
>
	<div
		class={`${selected ? '' : 'hidden'} bg-secondary absolute right-[-5px] top-[-5px] h-fit w-fit rounded-lg p-0.5`}
	>
		<Check size="16" />
	</div>
	{#if iconIndex != undefined}
		{@const Icon = btnIcons[iconIndex]}
		<Icon />
	{/if}
</button>
