<svelte:head>
	<title>Open RMM - Register</title>
</svelte:head>

<main>
	<h1 class="text-3xl font-bold underline">Register</h1>
	<form action="?/register" method="post" class="flex flex-col">
		<h2>User info</h2>
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label>Full name</label>
		<input type="text" name="full_name" />
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label>Email</label>
		<input type="text" name="email" />
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label>Password</label>
		<input type="password" name="password" />

		<h2>Tenant info</h2>
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label>Tenant name</label>
		<input type="text" name="tenant_name" />
		<button type="submit" class="">Register</button>
	</form>
</main>

<style lang="postcss">
	input {
		@apply bg-black;
	}
</style>
