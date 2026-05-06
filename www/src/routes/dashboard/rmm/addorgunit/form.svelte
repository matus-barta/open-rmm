<script lang="ts">
	import IconSelector from '$lib/components/iconSelector.svelte';
	import Input from '$lib/components/ui/input/input.svelte';

	import * as Form from '$lib/components/ui/form/index.js';
	import { formOrgUnit, type FormOrgUnitSchema } from '$lib/schemas/orgUnit';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';

	let { data }: { data: { form: SuperValidated<Infer<FormOrgUnitSchema>> } } = $props();

	const form = superForm(data.form, {
		validators: zod4Client(formOrgUnit),
		SPA: true,
		onUpdate: ({ form: f }) => {
			if (f.valid) {
				toast.success(`${f.data.name} was successfully created!`);
			} else {
				toast.error('Please fix the errors in the form.');
			}
		}
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance>
	<Form.Field {form} name="name">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Organization Unit Name:</Form.Label>
				<Input {...props} bind:value={$formData.name} />
			{/snippet}
		</Form.Control>

		<IconSelector />
		<Form.Description>Create new organization unit, choose name icon and color.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button size="lg">Create</Form.Button>
</form>
