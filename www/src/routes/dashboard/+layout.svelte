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
	import { error } from '@sveltejs/kit';

	export let data: LayoutData;
	const user = data.session?.user;

	const size = 30;

	const get_tenant = async (tenant_uuid: string) => {
		const { data: tenant, error: db_error } = await data.supabaseClient
			.from('tenants')
			.select('name')
			.eq('uuid', tenant_uuid)
			.limit(1) //https://supabase.com/docs/reference/javascript/single
			.single();
		if (!tenant) {
			console.log(db_error);
			throw error(404, db_error);
		} //TODO: log error and show some client friendly msg
		return tenant;
	};

	const get_profile = async (user_uuid: string) => {
		console.log(user_uuid);
		const { data: profile, error: db_error } = await data.supabaseClient
			.from('profiles')
			.select('photo, full_name, tenant_id')
			.eq('uuid', user_uuid)
			.limit(1)
			.single();
		if (!profile) {
			console.log(db_error);
			throw error(404, db_error);
		} //TODO: log error and show some client friendly msg
		return profile;
	};
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
			{#await get_profile(user.id) then profile}
				{#await get_tenant(profile.tenant_id) then tenant}
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
