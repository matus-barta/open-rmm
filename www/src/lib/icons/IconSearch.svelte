<script lang="ts">
	interface Props {
		size?: number | string;
		stroke?: number;
	}

	let { size = '1em', stroke = 1 }: Props = $props();
</script>

<svg
	width={size}
	height={size}
	xmlns="http://www.w3.org/2000/svg"
	fill="none"
	viewBox="0 0 24 24"
	stroke-width={stroke}
	stroke="inherit"
>
	<path
		stroke-linecap="round"
		stroke-linejoin="round"
		d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
	/>
</svg>
