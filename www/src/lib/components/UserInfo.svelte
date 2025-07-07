<script lang="ts">
	import IconUser from '$lib/icons/IconUser.svelte';

	interface Props {
		full_name: string;
		photo_url: string | null;
		email: string | undefined;
	}

	let { full_name, photo_url, email }: Props = $props();
</script>

<div class="flex flex-row w-fit h-full font-light text-sm pl-1 pr-2 items-center button-ish">
	<IconUser size="42" />
	<span class="pl-1 w-fit whitespace-nowrap">{full_name}</span>
</div>
