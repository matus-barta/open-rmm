import { add_org_unit } from '$lib/db/orgUnit';
import { get_tenant_id_by_user_id } from '$lib/db/tenant';
import { fail, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	create: async ({ request, locals }) => {
		const body = Object.fromEntries(await request.formData());

		try {
			if (locals.user) {
				const tenant_id = await get_tenant_id_by_user_id(locals.supabase, locals.user.id);
				add_org_unit(locals.supabase, body.OrgUnitName as string, tenant_id).catch(
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					(error: any) => {
						console.log(error);
					}
				);
			} else {
				//here failing when user is null
				return fail(500, { error: 'Server error, please try again later.' });
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			return fail(422, {
				OrgUnitName: body.OrgUnitName,
				error: error.message
			});
		}
	}
};
