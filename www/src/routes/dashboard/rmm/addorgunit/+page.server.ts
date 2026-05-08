import { add_org_unit } from '$lib/db/orgUnit';
import { get_tenant_id_by_user_id } from '$lib/db/tenant';
import { fail, type Actions } from '@sveltejs/kit';

import type { PageServerLoad } from './$types.js';
import { superValidate } from 'sveltekit-superforms';
import { formOrgUnit } from '$lib/schemas/orgUnit';
import { zod4 } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod4(formOrgUnit))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod4(formOrgUnit));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		if (!event.locals.user) {
			return fail(401, { form, error: 'Not authenticated.' });
		}

		try {
			const tenant_id = await get_tenant_id_by_user_id(event.locals.supabase, event.locals.user.id);
			const orgUnit = await add_org_unit(
				event.locals.supabase,
				form.data.name as string,
				tenant_id,
				form.data.color,
				form.data.icon
			);

			return { form, uuid: orgUnit.uuid };
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			return fail(422, {
				form,
				error: error?.message ?? 'Unknown error'
			});
		}
	}
};
