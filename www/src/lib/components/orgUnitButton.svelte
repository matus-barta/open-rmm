<script lang="ts">
	import { page } from '$app/state';
	import { btnColors, btnIcons } from '$lib/iconsList';
	import Button from './ui/button/button.svelte';

	interface Props {
		orgUnit: {
			uuid: string;
			name: string;
			color: number;
			icon_id: number;
		};
		count: number;
	}

	let { orgUnit, count }: Props = $props();
	const Component = btnIcons[orgUnit.icon_id];

	let selected = $derived(page.url.pathname.includes(orgUnit.uuid));
	let hover = $state(false);
</script>

<Button
	variant="ghost"
	href={`/dashboard/rmm/${orgUnit.uuid}`}
	class={`flex h-10 w-full flex-row justify-between ${selected ? 'bg-ring/25' : ''}`}
	onmouseenter={() => (hover = true)}
	onmouseleave={() => (hover = false)}
>
	<div class="flex flex-row items-center gap-4">
		<Component
			class={`stroke-background dark:stroke-foreground size-[30px] rounded-md ${
				orgUnit.color < btnColors.length || orgUnit.color < 0
					? btnColors[orgUnit.color]
					: 'bg-blue-800'
			} p-1.5 `}
		/>
		<span class="w-38 m-0 overflow-clip p-0 font-light">{orgUnit.name}</span>
	</div>
	<div class="flex h-7 w-7 items-center justify-center">
		<span class="flex h-4 w-4 items-center justify-center">{count}</span>
	</div>
</Button>
