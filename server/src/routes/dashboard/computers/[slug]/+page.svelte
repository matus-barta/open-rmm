<script lang="ts">
    import { page } from '$app/stores';
    import type { PageData } from "./$types"
    export let data: PageData;
</script>

<svelte:head>
    <title>Open RMM - {$page.params.slug}</title>
</svelte:head>


<div class="h-full relative">
    <div class="flex flex-col w-full">
        <div class="bg-slate-500 h-12 w-full flex flex-row">
            <button>Add computer</button>
            <button>...</button>
            <button>***</button>
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
    <div class="flex flex-col justify-between w-80 bg-gray-600 px-4 absolute top-0 right-0 h-full">
    <div class="flex flex-col">
        <h2>Add Computer</h2>
        <p>something</p>
        <p>something</p>
        <p>something</p>
    </div>
    <div class="flex flex-row justify-between py-4">
        <button>Add</button>
        <button>Cancel</button>
    </div>
</div>
</div>

