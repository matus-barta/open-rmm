<script lang="ts">
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	import { registrationEnabled } from '$lib/config';
	export let data: PageData;

	const submitLogout: SubmitFunction = async ({ cancel }) => {
		const { error } = await data.supabaseClient.auth.signOut();
		if (error) {
			console.log(error);
		}
		cancel();
	};
</script>

<svelte:head>
	<title>Open RMM</title>
</svelte:head>

<main>
	<h1>Open RMM - Main page</h1>
	{#if data.session}
		<p>Welcome back {data.session.user.email}!</p>
		<form action="/auth/logout" method="post" use:enhance={submitLogout}>
			<button type="submit" class="button-ish">Logout</button>
		</form>
	{:else}
		<p>Please login or register.</p>
		<div class="flex flex-col">
			<a class="button-ish" href="/auth/login">Login</a>
			{#if registrationEnabled}
				<a class="buttlon-ish" href="/auth/register">Register</a>
			{/if}
		</div>
	{/if}
</main>
