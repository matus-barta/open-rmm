<script lang="ts">
	import { btnIcons } from '$lib/iconsList';
	import IconSelect from './iconSelect.svelte';

	let { selectedIcon = $bindable(0) } = $props();
</script>

<div class="flex flex-row flex-wrap gap-2">
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
