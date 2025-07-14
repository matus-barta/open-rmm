<script lang="ts">
	import { page } from '$app/stores';
	import IconHome from '@lucide/svelte/icons/home';
	import Button from './ui/button/button.svelte';

	interface Props {
		orgUnit: {
			uuid: string;
			name: string;
			color: string | null;
			icon_id: number;
		};
		count: number;
	}

	let { orgUnit, count }: Props = $props();

	let selected = $derived($page.url.pathname.includes(orgUnit.uuid));
</script>

<Button
	variant="ghost"
	href={`/dashboard/rmm/${orgUnit.uuid}`}
	class={`flex h-10 flex-row justify-between ${selected ? 'bg-ring/25' : ''}`}
>
	<div class="flex flex-row items-center gap-4">
		<IconHome
			class="stroke-background dark:stroke-foreground size-[30px] rounded-md bg-blue-900 p-1.5"
		/>
		<span class="m-0 p-0 font-light">{orgUnit.name}</span>
	</div>
	<span>{count}</span>
</Button>
