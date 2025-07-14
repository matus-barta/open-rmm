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

	const btnColors = ['bg-blue-900', 'bg-red-900', 'bg-green-900', 'bg-yellow-500'];

	let { orgUnit, count }: Props = $props();

	let selected = $derived($page.url.pathname.includes(orgUnit.uuid));

	console.log(orgUnit.color);
</script>

<Button
	variant="ghost"
	href={`/dashboard/rmm/${orgUnit.uuid}`}
	class={`flex h-10 flex-row justify-between ${selected ? 'bg-ring/25' : ''}`}
>
	<div class="flex flex-row items-center gap-4">
		<IconHome
			class="stroke-background dark:stroke-foreground size-[30px] rounded-md {orgUnit.color != null
				? orgUnit.color
				: 'bg-blue-800'} p-1.5"
		/>
		<!--FIXME:Styles are not imported-->
		<span class="m-0 p-0 font-light">{orgUnit.name}</span>
	</div>
	<span>{count}</span>
</Button>
