<script lang="ts">
	import IconSelector from '$lib/components/iconSelector.svelte';
	import ColorSelector from '$lib/components/colorSelector.svelte';
	import Input from '$lib/components/ui/input/input.svelte';

	import * as Form from '$lib/components/ui/form/index.js';
	import { formOrgUnit, type FormOrgUnitSchema } from '$lib/schemas/orgUnit';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';

	let { data }: { data: { form: SuperValidated<Infer<FormOrgUnitSchema>> } } = $props();

	const form = superForm(data.form, {
		validators: zod4Client(formOrgUnit),

		onResult: ({ result }) => {
			// result.type: "success" | "failure" | "redirect" | "error"
			if (result.type === 'success') {
				console.log(`Org unit: "${result.data?.form.data.name}" uuid: "${result.data?.uuid}" `);
				toast.success(`Created org unit: ${result.data?.form.data.name}`);
			} else if (result.type === 'failure') {
				toast.error('Please fix the errors in the form.');
			} else if (result.type === 'error') {
				toast.error('Server error. Please try again.');
			}
		}
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance class="flex max-w-2xl flex-col gap-2">
	<Form.Field {form} name="name">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Organization Unit Name:</Form.Label>
				<Input {...props} bind:value={$formData.name} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="color">
		<Form.Control>
			{#snippet children({ props })}
				<ColorSelector bind:selectedColor={$formData.color} />
				<Input type="hidden" {...props} bind:value={$formData.color} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="icon">
		<Form.Control>
			{#snippet children({ props })}
				<IconSelector bind:selectedIcon={$formData.icon} />
				<Input type="hidden" {...props} bind:value={$formData.icon} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />

		<Form.Description>Choose name, color and icon for organization unit.</Form.Description>
	</Form.Field>
	<Form.Button size="lg">Create</Form.Button>
</form>
