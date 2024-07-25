<script lang="ts">
	import IconLogo from '$lib/icons/IconLogo.svelte';
	import IconSettings from '$lib/icons/IconSettings.svelte';
	import IconRMM from '$lib/icons/IconRMM.svelte';
	import NavPanelButton from '$lib/components/NavPanelButton.svelte';
	import SearchBox from '$lib/components/SearchBox.svelte';
	import UserInfo from '$lib/components/UserInfo.svelte';
	import IconInventory from '$lib/icons/IconInventory.svelte';
	import IconDoc from '$lib/icons/IconDoc.svelte';
	import { defaultRoute } from '$lib/config';
	import type { LayoutData } from './$types';
	import { get_tenant } from '$lib/db/tenant';
	import { get_profile } from '$lib/db/user';

	export let data: LayoutData;
	const user = data.session?.user;

	const size = 30;
</script>

<div id="Main" class="flex flex-col h-screen">
	<div
		id="TopPanel"
		class="flex flex-row w-full justify-between h-12 bg-darkest-color items-center"
	>
		<a href="/dashboard" class="py-1 px-[11px]">
			<IconLogo size="42" />
		</a>
		{#if user}
			{#await get_profile(data.supabase, user.id) then profile}
				{#await get_tenant(data.supabase, profile.tenant_id) then tenant}
					<span class="pl-1 w-fit whitespace-nowrap">{tenant.name}</span>
				{/await}
				<SearchBox />
				<UserInfo email={user.email} full_name={profile.full_name} photo_url={profile.photo} />
			{/await}
		{/if}
	</div>

	<div id="MainContent" class="flex flex-row h-full">
		<div id="NavPanel" class="flex flex-col justify-between bg-darkest-color">
			<div class="flex flex-col w-16">
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
		<slot />
	</div>
</div>

<style>
</style>
