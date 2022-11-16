<script lang="ts">
    import Sidebar from '$lib/components/sidebar.svelte';
    import Hidden from '$lib/components/hidden.svelte';
    import { page } from '$app/stores';
    import type { PageData } from "./$types"
    export let data: PageData;

    let child: Hidden;
</script>

<svelte:head>
    <title>Open RMM - {$page.params.slug}</title>
</svelte:head>

<div class="h-full relative">
    <div class="flex flex-col w-full">
        <div class="bg-slate-500 h-12 w-full flex flex-row">
            <button on:click={child.show}>Add computer</button>
            <button>Edit computer</button>
            <button>Delete computer</button>
        </div>
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
    </div>
    <Hidden bind:this={child} on:show={e => child.shown = e.detail}>
        <Sidebar sidebarType={"add"}/>
    </Hidden>
</div>
