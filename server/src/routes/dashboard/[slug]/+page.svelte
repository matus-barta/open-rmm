<script lang="ts">
    import { page } from '$app/stores';
    import type { PageData } from "./$types"
    export let data: PageData;
</script>

<svelte:head>
    <title>Open RMM - {$page.params.slug}</title>
</svelte:head>

<span class="bg-zinc-700">
    {#each data.computers as computer}
        <div class="flex flex-row justify-between border-b">
            <p>{computer.Uuid}</p>
            <p>{computer.IsAdded}</p>
            <p>{computer.IsAllowed}</p>
            <p>{computer.CreatedAt}</p>
        </div>
    {/each}
</span>