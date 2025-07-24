<script lang="ts">
	import { btnColors, btnIcons } from '$lib/iconsList';
	import IconSelect from './iconSelect.svelte';

	let selectedColor = $state(0);
	let selectedIcon = $state(0);
</script>

<div class="flex flex-row gap-2">
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

<div class="flex flex-row gap-2">
	{#each btnIcons, i}
		<IconSelect
			iconIndex={i}
			callback={() => {
				selectedIcon = i;
			}}
			selected={selectedIcon == i}
		/>
	{/each}
</div>
