<script lang="ts">
    import { page } from '$app/stores';
    import type { PageData } from "./$types"
    export let data: PageData;
</script>

<svelte:head>
    <title>Open RMM - {$page.params.slug}</title>
</svelte:head>

<span class="bg-zinc-700">
    <p>{data.computer.OneTimeKey}</p>
    <p>{data.computer.OrgUnit}</p>
</span>