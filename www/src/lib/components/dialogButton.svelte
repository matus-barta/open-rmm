<script lang="ts">
	import {
		Button,
		buttonVariants,
		type ButtonSize,
		type ButtonVariant
	} from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';

	type Props = {
		title: string;
		description: string;
		content: import('svelte').Snippet;
		variant?: ButtonVariant;
		size?: ButtonSize;
	};

	let { title, description, content, variant, size }: Props = $props();
</script>

<Dialog.Root>
	<Dialog.Trigger class={buttonVariants({ variant, size })}>
		{title}
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
