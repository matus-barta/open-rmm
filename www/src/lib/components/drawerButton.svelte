<script lang="ts">
	import {
		buttonVariants,
		type ButtonSize,
		type ButtonVariant
	} from '$lib/components/ui/button/index.js';

	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import type { TooltipContentProps } from 'bits-ui';
	import Button from './ui/button/button.svelte';
	import type { IconProps } from '@lucide/svelte';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';

	type Props = {
		title: string;
		description: string;
		content: import('svelte').Snippet;
		variant?: ButtonVariant;
		size?: ButtonSize;
		action?: () => void;
		actionName?: string;
		Icon?: import('svelte').Component<IconProps, {}, ''>;
		iconSize?: IconProps['size'];
		tooltipSide?: TooltipContentProps['side'];
		disabled?: boolean;
	};

	let {
		title,
		description,
		content,
		variant,
		size,
		action,
		actionName,
		Icon,
		iconSize,
		tooltipSide,
		disabled
	}: Props = $props();
</script>

<Sheet.Root>
	{#if Icon}
		<Tooltip.Provider>
			<Tooltip.Root>
				<Tooltip.Trigger>
					<Sheet.Trigger {disabled} class={buttonVariants({ variant, size })}>
						<Icon size={iconSize} />
					</Sheet.Trigger>
				</Tooltip.Trigger>
				<Tooltip.Content side={tooltipSide}>
					<p>{title}</p>
				</Tooltip.Content>
			</Tooltip.Root>
		</Tooltip.Provider>
	{:else}
		<Sheet.Trigger {disabled} class={buttonVariants({ variant, size })}>
			{title}
		</Sheet.Trigger>
	{/if}
	<Sheet.Content side="right">
		<Sheet.Header>
			<Sheet.Title>{title}</Sheet.Title>
			<Sheet.Description>
				{description}
			</Sheet.Description>
		</Sheet.Header>
		{@render content?.()}
		<Sheet.Footer class={action == undefined ? '' : 'grid grid-cols-2 gap-2'}>
			{#if action}
				<Button onclick={action}>{actionName}</Button>
			{/if}
			<Sheet.Close class={buttonVariants({ variant: 'outline' })}>Close</Sheet.Close>
		</Sheet.Footer>
	</Sheet.Content>
</Sheet.Root>
