<script lang="ts">
	import '/src/styles.postcss';
	import Nav from '/src/components/nav.svelte';
	import Footer from '/src/components/footer.svelte';
</script>

<div class="flex flex-col flex-grow h-screen">
	<Nav />
	<div class="p-4 sm:flex-col h-full flex-grow overflow-auto"><slot /></div>
	<Footer />
</div>
