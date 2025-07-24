<script lang="ts">
	interface Props {
		is: boolean | null | undefined;
	}

	let { is }: Props = $props();

	const size = 18;
	const stroke = 2.5;
</script>

<div class={`flex items-center justify-center ${is ? 'text-primary' : 'text-destructive'}`}>
	{#if is}
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
	{:else}
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
	{/if}
</div>
