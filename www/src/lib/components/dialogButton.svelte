<script lang="ts">
	import {
		Button,
		buttonVariants,
		type ButtonSize,
		type ButtonVariant
	} from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import type { IconProps } from '@lucide/svelte';

	type Props = {
		title: string;
		description: string;
		content: import('svelte').Snippet;
		variant?: ButtonVariant;
		size?: ButtonSize;
		Icon?: import('svelte').Component<IconProps, {}, ''>;
	};

	let { title, description, content, variant, size, Icon }: Props = $props();
</script>

<Dialog.Root>
	<Dialog.Trigger class={buttonVariants({ variant, size })}>
		{#if Icon}
			<div class="flex flex-row items-center justify-center gap-1">
				<Icon />
				<span class="text-muted-foreground text-xs tracking-tight">{title}</span>
				<!--maybe use tooltip?-->
			</div>
		{:else}
			{title}
		{/if}
	</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>{title}</Dialog.Title>
			<Dialog.Description>
				{description}
			</Dialog.Description>
		</Dialog.Header>
		{@render content?.()}
		<Dialog.Footer>
			<Button type="submit">Save changes</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
