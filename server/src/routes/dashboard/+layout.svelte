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

<div id="Main" class="flex flex-row h-screen">
	<div id="NavPanel" class="flex flex-col justify-between bg-darkest-color">
		<div class="flex flex-col w-16">
			<a href="/dashboard" class="p-2">
				<IconLogo size="48" />
			</a>
			<NavPanelButton link={defaultRoute}>
				<IconScreen {size} />
			</NavPanelButton>
			<NavPanelButton link="/dashboard/inventory">
				<IconInventory {size} />
			</NavPanelButton>
			<NavPanelButton link="/dashboard/docs">
				<IconDoc {size} />
			</NavPanelButton>
		</div>
		<NavPanelButton link="/dashboard/settings">
			<IconSettings {size} />
		</NavPanelButton>
	</div>
	<div id="MainContent" class="flex flex-col w-full">
		<div id="TopPanel" class="flex flex-row w-full justify-between pl-1 h-12 bg-darkest-color">
			<SearchBox />
			<UserInfo />
		</div>

		<slot />
	</div>
</div>

<style>
</style>
