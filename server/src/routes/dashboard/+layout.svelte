<script>
  import "../../app.css";
  // @ts-ignore
  import Nav from "$lib/components/nav.svelte";
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
        <a href="/dashboard/default">Default</a>
        <a href="/dashboard/default">Default</a>
        <a href="/dashboard/default">Default</a>
      </div>
      <div class="w-full">
        <slot />
      </div>
      
  </div>
</div>

