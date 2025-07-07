<script lang="ts">
	import { enhance } from '$app/forms';

	let { form } = $props();

	let creating = $state(false);
</script>

<svelte:head>
	<title>Open RMM - Add Org Unit</title>
</svelte:head>

<div class="flex flex-col items-center justify-center">
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
			class="button-ish rounded-lg border-[1px] border-gray-700 py-2 hover:bg-gray-200"
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
