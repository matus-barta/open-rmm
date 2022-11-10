<script lang="ts">
  import "../../app.css";
  // @ts-ignore
  import Nav from "$lib/components/nav.svelte";
  import type { LayoutData } from './$types';

  export let data: LayoutData;
</script>

<style>
  a{
    @apply p-4 bg-emerald-700 hover:bg-emerald-600;
  }
</style>

<div class="flex flex-col h-screen justify-between">
  <Nav/>
  <div class="flex flex-row mb-auto pt-16 w-full mx-auto h-full">
      <div class="flex flex-col w-64 bg-slate-600">
        {#each data.orgUnits as orgUnit}
          <a href="/dashboard/{orgUnit.OrgUnitName}">{orgUnit.OrgUnitName}</a>
        {/each}
      </div>
      <div class="w-full">
        <slot />
      </div>
      
  </div>
</div>

