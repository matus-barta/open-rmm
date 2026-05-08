<script lang="ts">
	import { btnColors } from '$lib/iconsList';
	import IconSelect from './iconSelect.svelte';

	let { selectedColor = $bindable(0) } = $props();
</script>

<div class="flex flex-row flex-wrap gap-2">
	{#each btnColors, i}
		<IconSelect
			colorIndex={i}
			callback={() => {
				selectedColor = i;
			}}
			selected={selectedColor == i}
		/>
	{/each}
</div>
