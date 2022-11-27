<script lang="ts">
    export let sidebarType: string;
    import Select from 'svelte-select';
    import { onMount } from 'svelte';
    import type { ReadOrgUnitInput } from '$lib/schema/orgUnit.schema';

    const sidebarData = {
        AddComputer : {
            title : "Add computer",
            button: "Add"
        },
        EditComputer: {
            title: "Edit computer",
            button: "Save"
        },
        RemoveComputer:{
            title: "Remove Computer",
            button: "Remove"
        }
    }
    let orgUnits: ReadOrgUnitInput[];
	let promise = fetch('/api/orgunit').then((x) => x.json());
</script>

<div class="flex flex-col justify-between w-80 bg-gray-600 px-4 absolute top-0 right-0 h-full drop-shadow-2xl">
    <div class="flex flex-col">
        <h2>
            {#if sidebarType == "add"}
                {sidebarData.AddComputer.title}
            {/if}
            {#if sidebarType == "edit"}
                {sidebarData.EditComputer.title}
            {/if}
            {#if sidebarType == "remove"}
                {sidebarData.RemoveComputer.title}
            {/if}
        </h2>
        {#await promise}
        {:then data} 
            <select>
            {#each data as orgUnit}
                <option>{orgUnit.OrgUnitName}</option>
            {/each}
        </select>
        {:catch error}
            {console.log(error)}
        {/await}
    </div>
    <div class="flex flex-row justify-between py-4">
        <button>
            {#if sidebarType == "add"}
                {sidebarData.AddComputer.button}
            {/if}
            {#if sidebarType == "edit"}
                {sidebarData.EditComputer.button}
            {/if}
            {#if sidebarType == "remove"}
                {sidebarData.RemoveComputer.button}
            {/if}
        </button>
        <button>Cancel</button>
    </div>
</div>