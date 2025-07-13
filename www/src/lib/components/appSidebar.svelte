<script lang="ts">
	import ArchiveIcon from '@lucide/svelte/icons/archive';
	import MonitorIcon from '@lucide/svelte/icons/monitor';
	import DocsIcon from '@lucide/svelte/icons/file-text';
	import SettingsIcon from '@lucide/svelte/icons/settings';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import Button from './ui/button/button.svelte';
	import NavUser from './navUser.svelte';
	import Separator from './ui/separator/separator.svelte';

	import { page } from '$app/stores';

	//data driven stuff -- here add new "apps" to the sidebar
	const data = {
		navMain: [
			{
				title: 'RMM',
				url: '/dashboard/rmm',
				icon: MonitorIcon
			},
			{
				title: 'Inventory',
				url: '/dashboard/inventory',
				icon: ArchiveIcon
			},
			{
				title: 'Docs',
				url: '/dashboard/docs',
				icon: DocsIcon
			}
		]
	};

	function isApp(title: string) {
		return $page.url.pathname.includes(title);
	}

	let selectedTypeToggle = true;

	type User = {
		email: string | null | undefined;
		name: string | null | undefined;
		avatar: string | null | undefined;
	};

	interface Props {
		children?: import('svelte').Snippet;
		user: User;
	}

	let { children, user }: Props = $props();
</script>

<appSidebar class="flex h-dvh flex-row">
	<apps
		class="bg-sidebar border-sidebar-border border-r-1 flex h-full w-16 flex-col justify-between py-2"
	>
		<content class="flex flex-col items-center gap-2">
			{#each data.navMain as app}
				<Tooltip.Provider>
					<Tooltip.Root>
						<Tooltip.Trigger>
							<div
								class={isApp(app.url) && selectedTypeToggle
									? 'border-my-primary dark:border-my-primary delay-50 border-l-2 transition duration-150 ease-in-out'
									: 'border-l-2 border-transparent transition delay-150 duration-300 ease-in-out'}
							>
								<Button href={app.url} variant="ghost" class="size-12">
									<app.icon
										class={isApp(app.url) && !selectedTypeToggle
											? 'stroke-my-primary size-8 stroke-1'
											: 'size-8 stroke-1'}
									/>
								</Button>
							</div>
						</Tooltip.Trigger>
						<Tooltip.Content side="right">
							<p>{app.title}</p>
						</Tooltip.Content>
					</Tooltip.Root>
				</Tooltip.Provider>
			{/each}
		</content>
		<footer class="flex flex-col items-center gap-2">
			<Tooltip.Provider>
				<Tooltip.Root>
					<Tooltip.Trigger>
						<div
							class={isApp('/dashboard/settings') && selectedTypeToggle
								? 'border-my-primary dark:border-my-primary delay-50 border-l-2 transition duration-150 ease-in-out'
								: 'delay-50  border-l-2 border-transparent transition duration-150 ease-in-out'}
						>
							<Button href="/dashboard/settings" variant="ghost" class="size-12">
								<SettingsIcon
									class={isApp('/dashboard/settings') && !selectedTypeToggle
										? 'stroke-my-primary size-8 stroke-1'
										: 'size-8 stroke-1'}
								/>
							</Button>
						</div>
					</Tooltip.Trigger>
					<Tooltip.Content side="right">
						<p>Settings</p>
					</Tooltip.Content>
				</Tooltip.Root>
			</Tooltip.Provider>
			<Separator />
			<NavUser {user} />
		</footer>
	</apps>
	<content>
		{@render children?.()}
	</content>
</appSidebar>
