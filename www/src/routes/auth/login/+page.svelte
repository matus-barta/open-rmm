<script lang="ts">
</script>

<svelte:head>
	<title>Open RMM - Login</title>
</svelte:head>

<main>
	<h1 class="text-3xl font-bold underline">Open RMM</h1>
	<form action="?/login" method="post" class="flex flex-col">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label for="email">Email</label>
		<input type="text" name="email" id="email" />
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label for="password">Password</label>
		<input type="password" name="password" id="password" />
		<button type="submit" class="">Login</button>
	</form>
</main>

<style lang="postcss">
	input {
		@apply bg-black;
	}
</style>
