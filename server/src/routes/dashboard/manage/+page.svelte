<script lang="ts">
    import type { PageData } from "./$types"
    export let data: PageData;

</script>

<svelte:head>
    <title>Open RMM - Dashboard</title>
</svelte:head>

<div class="h-screen">
    <div class="mx-44 pt-8">
        <h1>Manage computers</h1>
        <h2>Add computer</h2>
        <form method="POST" class="flex flex-col w-56">
            <select name="OrgUnit">
            {#each data.orgUnits as orgUnit}
                <option>{orgUnit.OrgUnitName}</option>
            {/each}
            </select>
            <button class="my-4">Add</button>
        </form>            
    </div>
</div>