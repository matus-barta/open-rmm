<script lang="ts">
	import IconLogo from '$lib/icons/IconLogo.svelte';
	import IconSettings from '$lib/icons/IconSettings.svelte';
	import IconRMM from '$lib/icons/IconRMM.svelte';
	import NavPanelButton from '$lib/components/NavPanelButton.svelte';
	import SearchBox from '$lib/components/searchBox.svelte';
	import UserInfo from '$lib/components/UserInfo.svelte';
	import IconInventory from '$lib/icons/IconInventory.svelte';
	import IconDoc from '$lib/icons/IconDoc.svelte';
	import { defaultRoute } from '$lib/config';
	import type { LayoutData } from './$types';
	import { get_tenant } from '$lib/db/tenant';
	import { get_profile } from '$lib/db/user';

	interface Props {
		data: LayoutData;
		children?: import('svelte').Snippet;
	}

	let { data, children }: Props = $props();
	const user = data.session?.user;

	const size = 30;
</script>

<div id="Main" class="flex h-screen flex-col">
	<div id="TopPanel" class="flex h-16 w-full flex-row items-center justify-between">
		<div class="flex flex-row items-center">
			<a href="/dashboard" class="px-[11px] py-1">
				<IconLogo size="42" />
			</a>
			{#if user}
				{#await get_profile(data.supabase, user.id) then profile}
					{#await get_tenant(data.supabase, profile.tenant_id) then tenant}
						<span class="w-fit whitespace-nowrap pl-1">{tenant.name}</span>
					{/await}
				{/await}
			{/if}
		</div>
		<SearchBox />

		{#if user}
			{#await get_profile(data.supabase, user.id) then profile}
				<UserInfo email={user.email} full_name={profile.full_name} photo_url={profile.photo} />
			{/await}
		{/if}
	</div>

	<div id="MainContent" class="flex h-full flex-row">
		<div id="NavPanel" class="bg-darkest-color flex flex-col justify-between">
			<div class="flex w-16 flex-col">
				<NavPanelButton link={defaultRoute} tooltip={'RMM'}>
					<IconRMM {size} />
				</NavPanelButton>
				<NavPanelButton link="/dashboard/inventory" tooltip={'Inventory'}>
					<IconInventory {size} />
				</NavPanelButton>
				<NavPanelButton link="/dashboard/docs" tooltip={'Documentation'}>
					<IconDoc {size} />
				</NavPanelButton>
			</div>
			<NavPanelButton link="/dashboard/settings" tooltip={'Setting'}>
				<IconSettings {size} />
			</NavPanelButton>
		</div>
		{@render children?.()}
	</div>
</div>
