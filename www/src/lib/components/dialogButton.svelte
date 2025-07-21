<script lang="ts">
	import {
		Button,
		buttonVariants,
		type ButtonSize,
		type ButtonVariant
	} from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import type { IconProps } from '@lucide/svelte';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import type { TooltipContentProps } from 'bits-ui';

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
	};

	let {
		title,
		description,
		content,
		variant,
		size,
		Icon,
		iconSize,
		tooltipSide,
		action,
		actionName
	}: Props = $props();
</script>

<Dialog.Root>
	{#if Icon}
		<Tooltip.Provider>
			<Tooltip.Root>
				<Tooltip.Trigger>
					<Dialog.Trigger class={buttonVariants({ variant, size })}>
						<Icon size={iconSize} />
					</Dialog.Trigger>
				</Tooltip.Trigger>
				<Tooltip.Content side={tooltipSide}>
					<p>{title}</p>
				</Tooltip.Content>
			</Tooltip.Root>
		</Tooltip.Provider>
	{:else}
		<Dialog.Trigger class={buttonVariants({ variant, size })}>
			{title}
		</Dialog.Trigger>
	{/if}

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
