<script lang="ts">
import { onMount } from 'svelte';

onMount(async () => {
	fetch('http://127.0.0.1:5005/api/computers') //CORS -_-
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
		});
});
</script>

<svelte:head>
	<title>Open RMM</title>
</svelte:head>

<div class="bg-gray-700 rounded-xl shadow-md px-3 pt-6 pb-6"></div>
