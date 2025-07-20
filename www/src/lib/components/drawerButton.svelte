<script lang="ts">
	import {
		buttonVariants,
		type ButtonSize,
		type ButtonVariant
	} from '$lib/components/ui/button/index.js';

	import * as Sheet from '$lib/components/ui/sheet/index.js';

	type Props = {
		title: string;
		description: string;
		content: import('svelte').Snippet;
		variant?: ButtonVariant;
		size?: ButtonSize;
	};

	let { title, description, content, variant, size }: Props = $props();
</script>

<Sheet.Root>
	<Sheet.Trigger class={buttonVariants({ variant, size })}>
		{title}
	</Sheet.Trigger>
	<Sheet.Content side="right">
		<Sheet.Header>
			<Sheet.Title>{title}</Sheet.Title>
			<Sheet.Description>
				{description}
			</Sheet.Description>
		</Sheet.Header>
		{@render content?.()}
		<Sheet.Footer>
			<Sheet.Close class={buttonVariants({ variant: 'default' })}>Save changes</Sheet.Close>
		</Sheet.Footer>
	</Sheet.Content>
</Sheet.Root>
