<script lang="ts">
	import type { LayoutData } from './$types';

	import AppSidebar from '$lib/components/appSidebar.svelte';
	import TopBar from '$lib/components/topBar.svelte';

	interface Props {
		data: LayoutData;
		children?: import('svelte').Snippet;
	}

	let { data, children }: Props = $props();
	const user = data.session?.user;
</script>

<root class="flex h-screen flex-col">
	<TopBar tenantName={data.tenant?.name} stars={data.ghStars} />
	<AppSidebar
		user={{ name: data.profile?.full_name, email: data.user?.email, avatar: data.profile?.photo }}
	>
		{@render children?.()}
	</AppSidebar>
</root>
