<script lang="ts">
	import { page } from '$app/stores';
	import IconHome from '@lucide/svelte/icons/home';
	import Button from './ui/button/button.svelte';
	import DotsIcon from '@lucide/svelte/icons/ellipsis-vertical';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
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
		'bg-red-500',
		'bg-orange-500',
		'bg-amber-500',
		'bg-yellow-500',
		'bg-lime-500',
		'bg-green-500',
		'bg-emerald-500',
		'bg-teal-500',
		'bg-cyan-500',
		'bg-sky-500',
		'bg-blue-500',
		'bg-indigo-500',
		'bg-violet-500',
		'bg-fuchsia-500',
		'bg-pink-500',
		'bg-rose-500'
	];

	let { orgUnit, count }: Props = $props();

	let selected = $derived($page.url.pathname.includes(orgUnit.uuid));
	let hover = $state(false);
</script>

<Button
	variant="ghost"
	href={`/dashboard/rmm/${orgUnit.uuid}`}
	class={`flex h-10 flex-row justify-between ${selected ? 'bg-ring/25' : ''}`}
	onmouseenter={() => (hover = true)}
	onmouseleave={() => (hover = false)}
>
	<div class="flex flex-row items-center gap-4">
		<IconHome
			class={`stroke-background dark:stroke-foreground size-[30px] rounded-md ${
				orgUnit.color < btnColors.length || orgUnit.color < 0
					? btnColors[orgUnit.color]
					: 'bg-blue-800'
			} p-1.5 `}
		/>
		<span class="m-0 p-0 font-light">{orgUnit.name}</span>
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
