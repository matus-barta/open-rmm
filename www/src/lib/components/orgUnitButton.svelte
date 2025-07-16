<script lang="ts">
	import { page } from '$app/stores';
	import Button from './ui/button/button.svelte';
	import DotsIcon from '@lucide/svelte/icons/ellipsis-vertical';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';

	import {
		Home,
		Building,
		Building2,
		School,
		Blocks,
		Wrench,
		Server,
		HardDrive,
		Database,
		Cloud,
		Network,
		Star,
		Key,
		Folder,
		Zap,
		Laptop
	} from '@lucide/svelte/icons';

	interface Props {
		orgUnit: {
			uuid: string;
			name: string;
			color: number;
			icon_id: number;
		};
		count: number;
	}

	const btnColors = [
		'bg-blue-800',
		'bg-red-600',
		'bg-orange-600',
		'bg-amber-600',
		'bg-yellow-600',
		'bg-lime-600',
		'bg-green-600',
		'bg-emerald-600',
		'bg-teal-600',
		'bg-cyan-600',
		'bg-sky-600',
		'bg-blue-600',
		'bg-indigo-600',
		'bg-violet-600',
		'bg-fuchsia-600',
		'bg-pink-600',
		'bg-rose-600'
	];

	const btnIcons = [
		Home,
		Building,
		Building2,
		School,
		Blocks,
		Wrench,
		Server,
		HardDrive,
		Database,
		Cloud,
		Network,
		Star,
		Key,
		Folder,
		Zap,
		Laptop
	];

	let { orgUnit, count }: Props = $props();
	const Component = btnIcons[orgUnit.icon_id];

	let selected = $derived($page.url.pathname.includes(orgUnit.uuid));
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

	<Button
		variant="ghost"
		size="icon"
		class="h-7 w-7 {selected && hover
			? 'hover:bg-black/10 dark:hover:bg-white/10'
			: 'hover:bg-transparent dark:hover:bg-transparent'}"
	>
		{#if hover && selected}
			<Tooltip.Provider>
				<Tooltip.Root>
					<Tooltip.Trigger>
						<DotsIcon size="16" class="m-0 p-0" />
					</Tooltip.Trigger>
					<Tooltip.Content side="right">
						<p>Edit</p>
					</Tooltip.Content>
				</Tooltip.Root>
			</Tooltip.Provider>
		{:else}
			<span class="w-4">{count}</span>
		{/if}
	</Button>
</Button>
