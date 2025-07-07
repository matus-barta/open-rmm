<script lang="ts">
	import IconQuestion from '$lib/icons/IconQuestion.svelte';
	interface Props {
		is: boolean | null | undefined;
	}

	let { is }: Props = $props();

	const size = 20;
	const stroke = 2.5;
</script>

{#if is == true}
	<div class="checkmark text-green">
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
{:else if is == false}
	<div class="checkmark text-red">
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
{:else}
	<div class="checkmark text-gray-color">
		<IconQuestion {size} />
	</div>
{/if}

<style lang="postcss">
	@reference "tailwindcss";
	.checkmark {
		@apply flex justify-center p-[1px];
	}
</style>
