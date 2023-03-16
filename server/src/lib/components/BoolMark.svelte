<script lang="ts">
	export let is: boolean | null;

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
	<div class="checkmark text-grey-color">
		<svg
			width={size}
			height={size}
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width={stroke}
			stroke="currentColor"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
			/>
		</svg>
	</div>
{/if}

<style>
	.checkmark {
		@apply flex justify-center p-[1px];
	}
</style>
