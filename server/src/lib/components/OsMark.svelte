<script lang="ts">
	export let os: string | null;

	const size = 15;
	const stroke = 2.5;
</script>

{#if os?.toLowerCase().includes('windows')}
	<div class="checkmark">
		<svg
			width={size}
			height={size}
			viewBox="-0.5 0 257 257"
			xmlns="http://www.w3.org/2000/svg"
			preserveAspectRatio="xMidYMid"
			><path
				d="M0 36.357L104.62 22.11l.045 100.914-104.57.595L0 36.358zm104.57 98.293l.08 101.002L.081 221.275l-.006-87.302 104.494.677zm12.682-114.405L255.968 0v121.74l-138.716 1.1V20.246zM256 135.6l-.033 121.191-138.716-19.578-.194-101.84L256 135.6z"
				fill="#00ADEF"
			/></svg
		>
	</div>
{:else if os?.toLowerCase().includes('mac')}
	<div class="checkmark">
		<svg
			width={size}
			height={size}
			viewBox="-56.24 0 608.728 608.728"
			xmlns="http://www.w3.org/2000/svg"
			><path
				d="M273.81 52.973C313.806.257 369.41 0 369.41 0s8.271 49.562-31.463 97.306c-42.426 50.98-90.649 42.638-90.649 42.638s-9.055-40.094 26.512-86.971zM252.385 174.662c20.576 0 58.764-28.284 108.471-28.284 85.562 0 119.222 60.883 119.222 60.883s-65.833 33.659-65.833 115.331c0 92.133 82.01 123.885 82.01 123.885s-57.328 161.357-134.762 161.357c-35.565 0-63.215-23.967-100.688-23.967-38.188 0-76.084 24.861-100.766 24.861C89.33 608.73 0 455.666 0 332.628c0-121.052 75.612-184.554 146.533-184.554 46.105 0 81.883 26.588 105.852 26.588z"
				fill="#999"
			/></svg
		>
	</div>
{:else if os?.toLowerCase().includes('ubuntu')}
	<div class="checkmark">
		<svg
			width={size}
			height={size}
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
			viewBox="0 0 100 100"
		>
			<circle fill="#f47421" cy="50" cx="50" r="45" />
			<circle fill="none" stroke="#ffffff" stroke-width="8.55" cx="50" cy="50" r="21.825" />
			<g id="friend"
				><circle fill="#f47421" cx="19.4" cy="50" r="8.4376" />
				<path stroke="#f47421" stroke-width="3.2378" d="M67,50H77" />
				<circle fill="#ffffff" cx="19.4" cy="50" r="6.00745" /></g
			>
			<use xlink:href="#friend" transform="rotate(120,50,50)" />
			<use xlink:href="#friend" transform="rotate(240,50,50)" /></svg
		>
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
