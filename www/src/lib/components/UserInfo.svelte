<script lang="ts">
	import IconUser from '$lib/icons/IconUser.svelte';

	export let full_name: string;
	export let photo_url: string | null;
	export let email: string | undefined;
</script>

<div class="flex flex-row w-fit h-full font-light text-sm pl-1 pr-2 items-center button-ish">
	<IconUser size="42" />
	<span class="pl-1 w-fit whitespace-nowrap">{full_name}</span>
</div>
