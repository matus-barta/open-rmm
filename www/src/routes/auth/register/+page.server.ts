import { defaultRoute, registrationEnabled } from '$lib/config';
import { add_org_unit } from '$lib/db/orgUnit';
import { supabaseServiceClient } from '$lib/server/supabase';

import { AuthApiError } from '@supabase/supabase-js';

import { fail, redirect, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	register: async ({ request, locals }) => {
		if (registrationEnabled) {
			const body = Object.fromEntries(await request.formData());

			//-----------REGISTERING USER----------//
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { data: user_data, error: err } = await locals.supabase.auth.signUp({
				email: body.email as string,
				password: body.password as string
			});
			if (err) {
				if (err instanceof AuthApiError) {
					switch (err.status) {
						case 400:
							return fail(400, { error: 'Invalid email or password.' });
						case 422:
							return fail(422, { error: err.message });
					}
				}
				return fail(500, { error: 'Server error, please try again later.' });
			}

			const tenant_name = body.tenant_name as string; //TODO: do some input checking

			//-----------CREATING TENANT-----------//
			const { data: db_req_data, error: db_err } = await supabaseServiceClient
				.from('tenants')
				.insert([{ name: tenant_name }])
				.select('uuid');

			if (db_err) {
				return fail(500, { error: 'Server error, please try again later.' });
			}

			//-------CREATING USER PROFILE WITH ID OF USER AND TENANT ID--------//
			if (user_data.user) {
				//verify user is not null (the insert doesn't like null option)
				const full_name = body.full_name as string; //TODO: verify user input

				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const { data: db_req_data2, error: db_err2 } = await supabaseServiceClient
					.from('profiles')
					.insert([
						{ uuid: user_data.user.id, full_name: full_name, tenant_id: db_req_data[0].uuid }
					])
					.select();

				if (db_err2) {
					return fail(500, { error: 'Server error, please try again later.' });
				}

				//----------CREATE DEFAULT ORG UNIT---------//
				add_org_unit(supabaseServiceClient, 'Default', db_req_data[0].uuid);

				//when successful then redirect
				throw redirect(303, defaultRoute);
			} else {
				//here failing when user is null
				return fail(500, { error: 'Server error, please try again later.' });
			}
		} else {
			return fail(403, { error: 'Registration disabled.' });
		}
	}
};
