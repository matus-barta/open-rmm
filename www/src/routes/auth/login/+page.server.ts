import { AuthApiError } from '@supabase/supabase-js';
import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { defaultRoute } from '$lib/config';

export const actions: Actions = {
	login: async ({ request, locals }) => {
		const body = Object.fromEntries(await request.formData());

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { data, error: err } = await locals.supabaseServer.auth.signInWithPassword({
			email: body.email as string,
			password: body.password as string
		});

		if (err) {
			if (err instanceof AuthApiError && err.status == 400) {
				return fail(400, { error: 'Invalid credentials' });
			}
			return fail(500, { error: 'Server error , please try again later.' });
		}

		throw redirect(303, defaultRoute);
	}
};
