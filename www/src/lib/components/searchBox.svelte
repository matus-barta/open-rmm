<script lang="ts">
	import * as Command from '$lib/components/ui/command/index.js';
	import Button from './ui/button/button.svelte';
	import { browser } from '$app/environment';

	let open = $state(false);

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
			e.preventDefault();
			open = !open;
		}
	}

	const platform = browser && window.navigator.platform;
</script>

<svelte:document onkeydown={handleKeydown} />

<Button
	variant="outline"
	onclick={() => {
		open = true;
	}}
	class="flex h-8 w-72 flex-row items-center justify-between rounded-2xl "
>
	<p class="text-muted-foreground text-sm">Type a command or search...</p>
	<kbd
		class="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100"
	>
		<span class="text-xs">{platform === 'MacIntel' ? '⌘' : 'Ctrl'}</span> + K
	</kbd>
</Button>

<Command.Dialog bind:open>
	<Command.Input placeholder="Type a command or search..." />
	<Command.List>
		<Command.Empty>No results found.</Command.Empty>
		<Command.Group heading="Suggestions">
			<Command.Item>THIS IS NOT WORKING - JUST PLACEHOLDER</Command.Item>
		</Command.Group>
	</Command.List>
</Command.Dialog>
