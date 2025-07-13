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

<Button href={`/dashboard/rmm/${orgUnit.uuid}`}>
	<div class="flex flex-row items-center gap-2">
		<IconHome size="20" />
		<span class="m-0 p-0">{orgUnit.name}</span>
	</div>
	<span>{count}</span>
</Button>
