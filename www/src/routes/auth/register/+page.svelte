<script>
	import { registrationEnabled } from '$lib/config';
</script>

<svelte:head>
	<title>Open RMM - Register</title>
</svelte:head>

<main>
	<h1 class="text-3xl font-bold underline">Register</h1>
	{#if registrationEnabled}
		<form action="?/register" method="post" class="flex flex-col">
			<h2>User info</h2>
			<!-- svelte-ignore a11y_label_has_associated_control -->
			<label for="full_name">Full name</label>
			<input type="text" name="full_name" id="full_name" />
			<!-- svelte-ignore a11y_label_has_associated_control -->
			<label for="email">Email</label>
			<input type="text" name="email" id="email" />
			<!-- svelte-ignore a11y_label_has_associated_control -->
			<label for="password">Password</label>
			<input type="password" name="password" id="password" />

			<h2>Tenant info</h2>
			<!-- svelte-ignore a11y_label_has_associated_control -->
			<label for="tenant_name">Tenant name</label>
			<input type="text" name="tenant_name" id="tenant_name" />
			<button type="submit" class="">Register</button>
		</form>
	{:else}
		<p>Sorry registration is disabled.</p>
	{/if}
</main>

<style lang="postcss">
	input {
		@apply bg-black;
	}
</style>
