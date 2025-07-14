<script lang="ts">
	import IconLogo from '$lib/icons/IconLogo.svelte';
	import SearchBox from './searchBox.svelte';
	import Button from './ui/button/button.svelte';
	import Separator from './ui/separator/separator.svelte';
	import GithubIcon from '@lucide/svelte/icons/github';
	import MoonIcon from '@lucide/svelte/icons/moon';
	import SunIcon from '@lucide/svelte/icons/sun';
	import { toggleMode } from 'mode-watcher';

	interface Props {
		tenantName: string | null | undefined;
		stars: number | null | undefined;
	}

	let { tenantName, stars }: Props = $props();
</script>

<div
	id="TopPanel"
	class="bg-primary-foreground flex h-16 w-full flex-row items-center justify-between border-b-[2px] px-2"
>
	<a
		href="/dashboard"
		class="hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 flex flex-row items-center space-x-4 rounded-xl p-2 transition delay-50 duration-150 ease-in-out"
	>
		<IconLogo size="32" />
		<div class="grid flex-1 text-left text-sm leading-tight">
			<span class="truncate font-medium">{tenantName}</span>
			<span class="text-muted-foreground truncate text-xs">Enterprise</span>
		</div>
	</a>

	<div class="flex h-8 flex-row space-x-2">
		<SearchBox />
		<Separator orientation="vertical" />
		<Button href="https://github.com/matus-barta/Open_RMM" variant="outline" size="sm">
			<GithubIcon class="stroke-accent-foreground" />
			<span class="text-muted-foreground truncate text-xs leading-tight">{stars}</span>
		</Button>
		<Separator orientation="vertical" />
		<Button onclick={toggleMode} variant="outline" size="sm">
			<SunIcon
				class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 !transition-all dark:scale-0 dark:-rotate-90"
			/>
			<MoonIcon
				class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 !transition-all dark:scale-100 dark:rotate-0"
			/>
			<span class="sr-only">Toggle theme</span>
		</Button>
	</div>
</div>
