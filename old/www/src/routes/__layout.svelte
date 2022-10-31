<script>
import Footer from '../components/footer.svelte';
import Nav from '../components/nav.svelte';
import '../app.css';
</script>

<div class="flex flex-row">
	<Nav />
	<div class="flex-1 ml-16 flex flex-col justify-between">
		<div class="grow my-auto p-8">
			<slot />
		</div>
		<Footer />
	</div>
</div>
