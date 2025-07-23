<script lang="ts">
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import type { IconProps } from '@lucide/svelte';
	import type { TooltipContentProps } from 'bits-ui';
	import { buttonVariants, type ButtonSize, type ButtonVariant } from './ui/button/button.svelte';

	type Props = {
		tooltip: string;
		variant?: ButtonVariant;
		btnSize?: ButtonSize;
		onclick?: () => void;
		Icon: import('svelte').Component<IconProps, {}, ''>;
		iconSize?: IconProps['size'];
		side?: TooltipContentProps['side'];
		disabled?: boolean;
	};

	let { tooltip, variant, iconSize, Icon, btnSize, side, onclick, disabled }: Props = $props();
</script>

<Tooltip.Provider>
	<Tooltip.Root>
		<Tooltip.Trigger {disabled} class={buttonVariants({ variant, size: btnSize })} {onclick}>
			<Icon size={iconSize} />
		</Tooltip.Trigger>
		<Tooltip.Content {side}>
			<p>{tooltip}</p>
		</Tooltip.Content>
	</Tooltip.Root>
</Tooltip.Provider>
