<script lang="ts">
  import "../../app.css";
  //import type { LayoutData } from './$types';

  //export let data: LayoutData;
</script>

<style>
</style>


<div class="flex flex-row h-screen">
  <div class="flex flex-col justify-between">
    <div class="flex flex-col w-16">
      <a href="/dashboard">
        <img src="/media/logo.svg" class="p-2" alt="logo"/>
      </a>
      <a href="/dashboard/computers/" class="h-16 px-6 py-6 text-base hover:bg-grey-400">
        C
      </a>
      <a href="/dashboard/settings/" class="h-16 px-6 py-6 text-base hover:bg-grey-400">
        E
      </a>
      <a href="/dashboard/settings/" class="h-16 px-6 py-6 text-base hover:bg-grey-400">
        U
      </a>
    </div>
    <a href="/dashboard/settings/" class="h-16 px-6 py-6 text-base hover:bg-grey-400">
      S
    </a>
  </div>
  <div class="flex flex-col w-full">
    <div class="flex flex-row w-full h-16 bg-slate-700">
      <div class="flex justify-center w-full">
        <div class="bg-gray-400 rounded-3xl my-4 px-4 py-1 w-96">Search</div>
      </div>
      <div class="bg-gray-500 w-16 p-6">
        U
      </div>
    </div>
    <div class="h-full">
      <slot />
    </div>
  </div>
</div>
