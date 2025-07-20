<script lang="ts">
	import { CircleQuestionMark } from '@lucide/svelte/icons';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	interface Props {
		type: string | null | undefined;
	}

	let { type }: Props = $props();

	const size = 18;
</script>

<div class="flex items-center justify-center">
	<Tooltip.Provider>
		<Tooltip.Root>
			<Tooltip.Trigger>
				{#if type?.toLowerCase().includes('physical')}
					<svg width={size} height={size} viewBox="0 0 640 512"
						><path
							fill="currentColor"
							d="M384 96v224H64V96h320zM64 32C28.7 32 0 60.7 0 96v224c0 35.3 28.7 64 64 64h117.3l-10.7 32H96c-17.7 0-32 14.3-32 32s14.3 32 32 32h256c17.7 0 32-14.3 32-32s-14.3-32-32-32h-74.7l-10.7-32H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm464 0c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h64c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48h-64zm16 64h32c8.8 0 16 7.2 16 16s-7.2 16-16 16h-32c-8.8 0-16-7.2-16-16s7.2-16 16-16zm-16 80c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16s-7.2 16-16 16h-32c-8.8 0-16-7.2-16-16zm32 160a32 32 0 1 1 0 64a32 32 0 1 1 0-64z"
						/></svg
					>
				{:else if type?.toLowerCase().includes('vm')}
					<svg width={size} height={size} viewBox="0 0 36 36"
						><path
							fill="currentColor"
							d="M11 5h14v3h2V5a2 2 0 0 0-2-2H11a2 2 0 0 0-2 2v6.85h2Z"
							class="clr-i-outline clr-i-outline-path-1"
						/><path
							fill="currentColor"
							d="M30 10H17v2h8v6h2v-6h3v14h-8v-9a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3h8a2 2 0 0 0 2-2V12a2 2 0 0 0-2-2ZM6 31V17h14v9h-4v-6h-2v6a2 2 0 0 0 2 2h4v3Z"
							class="clr-i-outline clr-i-outline-path-2"
						/><path fill="none" d="M0 0h36v36H0z" /></svg
					>
				{:else if type?.toLowerCase().includes('lxc')}
					<svg width={size} height={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"
						><path
							fill="currentColor"
							d="M8.38 1.103a.75.75 0 0 0-.76 0L.37 5.353a.75.75 0 0 0 0 1.294l7.25 4.25a.75.75 0 0 0 .76 0l7.25-4.25a.75.75 0 0 0 0-1.294l-7.25-4.25ZM8 9.381L2.233 6L8 2.62L13.767 6L8 9.38Zm-6.87-.028a.75.75 0 0 0-.76 1.294l7.25 4.25a.75.75 0 0 0 .76 0l7.25-4.25a.75.75 0 0 0-.76-1.294L8 13.381L1.13 9.353Z"
						/></svg
					>
				{:else}
					<CircleQuestionMark class="text-neutral-300" size={size + 2} />
				{/if}
			</Tooltip.Trigger>
			<Tooltip.Content side="bottom">
				<p>{type}</p>
			</Tooltip.Content>
		</Tooltip.Root>
	</Tooltip.Provider>
</div>
