<script lang="ts">
	import { enhance } from '$app/forms';

	export let form;

	let creating = false;
</script>

<svelte:head>
	<title>Open RMM - Add Org Unit</title>
</svelte:head>

<div class="flex justify-center items-center flex-col">
	<h1>Add Organization</h1>

	<form
		class="flex flex-col gap-5"
		method="POST"
		action="?/create"
		use:enhance={() => {
			creating = true;

			return async ({ update }) => {
				await update();
				creating = false;
			};
		}}
	>
		<label>
			Organization Unit Name:
			<input
				disabled={creating}
				name="OrgUnitName"
				value={form?.OrgUnitName ?? ''}
				autocomplete="off"
				required
			/>
		</label>
		<input
			class="button-ish border-[1px] rounded-lg border-grey-color py-2 hover:bg-dark-color-more-lighter"
			type="submit"
			value="Create"
		/>
	</form>

	{#if form?.error}
		<p class="text-red p-2">{form.error}</p>
	{/if}
	{#if creating}
		<span class="opacity-50">saving...</span>
	{/if}
</div>
