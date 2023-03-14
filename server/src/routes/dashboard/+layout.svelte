<script lang="ts">
	import '../../app.css';
	import IconLogo from '$lib/icons/IconLogo.svelte';
	import IconSettings from '$lib/icons/IconSettings.svelte';
	import IconScreen from '$lib/icons/IconScreen.svelte';
	import NavPanelButton from '$lib/components/NavPanelButton.svelte';
	import SearchBox from '$lib/components/SearchBox.svelte';
	import UserInfo from '$lib/components/UserInfo.svelte';
	import IconInventory from '$lib/icons/IconInventory.svelte';
	import IconDoc from '$lib/icons/IconDoc.svelte';
	import { defaultRoute } from '$lib/config';
	//import type { LayoutData } from './$types';

	//export let data: LayoutData;

	const size = 30;
</script>

<div id="Main" class="flex flex-col h-screen">
	<div id="TopPanel" class="flex flex-row w-full justify-between h-12 bg-darkest-color">
		<a href="/dashboard" class="py-1 px-[11px]">
			<IconLogo size="42" />
		</a>
		<SearchBox />
		<UserInfo />
	</div>

	<div id="MainContent" class="flex flex-row h-full">
		<div id="NavPanel" class="flex flex-col justify-between bg-darkest-color">
			<div class="flex flex-col w-16">
				<NavPanelButton link={defaultRoute} tooltip={'RMM'}>
					<IconScreen {size} />
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
