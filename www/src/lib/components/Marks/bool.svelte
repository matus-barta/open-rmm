<script lang="ts">
	import IconQuestion from '$lib/icons/IconQuestion.svelte';
	import { CircleQuestionMark } from '@lucide/svelte';
	interface Props {
		is: boolean | null | undefined;
	}

	let { is }: Props = $props();

	const size = 18;
	const stroke = 2.5;
</script>

<div class="checkmark flex">
	{#if is}
		<div class="text-primary">
			<svg
				width={size}
				height={size}
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width={stroke}
				stroke="currentColor"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
			</svg>
		</div>
	{:else}
		<div class=" text-destructive">
			<svg
				width={size}
				height={size}
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width={stroke}
				stroke="currentColor"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
			</svg>
		</div>
	{/if}
</div>

<style lang="postcss">
	@reference "tailwindcss";
	.checkmark {
		@apply items-center justify-center text-neutral-300;
	}
</style>
