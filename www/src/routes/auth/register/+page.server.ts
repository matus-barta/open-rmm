import { supabaseServiceClient } from '$lib/server/supabase';
import { AuthApiError } from '@supabase/supabase-js';
import { fail, redirect, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	register: async ({ request, locals }) => {
		const body = Object.fromEntries(await request.formData());

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { data: user_data, error: err } = await locals.supabaseServer.auth.signUp({
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

		//creating tenant
		const { data: db_req_data, error: db_err } = await supabaseServiceClient
			.from('tenants')
			.insert([{ name: tenant_name }])
			.select('uuid');

		if (db_err) {
			return fail(500, { error: 'Server error, please try again later.' });
		}

		//creating user profile with id of user and tenant id
		if (user_data.user) {
			//verify user is not null (the insert doesn't like null option)
			const full_name = body.full_name as string; //TODO: verify user input

			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { data: db_req_data2, error: db_err2 } = await supabaseServiceClient
				.from('profiles')
				.insert([{ uuid: user_data.user.id, full_name: full_name, tenant_id: db_req_data[0].uuid }])
				.select();

			if (db_err2) {
				return fail(500, { error: 'Server error, please try again later.' });
			}

			throw redirect(303, '/'); //when successful redirect
		} else {
			//here failing when user is null
			return fail(500, { error: 'Server error, please try again later.' });
		}
	}
};
