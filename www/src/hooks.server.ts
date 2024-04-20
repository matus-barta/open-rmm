import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import { createServerClient } from '@supabase/ssr';
import { redirect, type Handle } from '@sveltejs/kit';
import type { Database } from '$lib/database.types';

//https://www.reddit.com/r/sveltejs/comments/16w2o41/supabase_auth_and_sveltekit_docs_suck_so_here_we/
//https://supabase.com/docs/guides/auth/server-side/creating-a-client?environment=hooks&framework=sveltekit
export const handle: Handle = async ({ event, resolve }) => {
	//prepare supabaseServer function
	event.locals.supabaseServer = createServerClient<Database>(
		PUBLIC_SUPABASE_URL,
		PUBLIC_SUPABASE_ANON_KEY,
		{
			cookies: {
				get: (key) => event.cookies.get(key),
				/**
				 * Note: You have to add the `path` variable to the
				 * set and remove method due to sveltekit's cookie API
				 * requiring this to be set, setting the path to an empty string
				 * will replicate previous/standard behaviour (https://kit.svelte.dev/docs/types#public-types-cookies)
				 */
				set: (key, value, options) => {
					event.cookies.set(key, value, { ...options, path: '/' });
				},
				remove: (key, options) => {
					event.cookies.delete(key, { ...options, path: '/' });
				}
			}
		}
	);

	/**
	 * Unlike `supabase.auth.getSession`, which is unsafe on the server because it
	 * doesn't validate the JWT, this function validates the JWT by first calling
	 * `getUser` and aborts early if the JWT signature is invalid.
	 */
	//prepare safeGetSession function - now only local one
	const safeGetSession = async () => {
		const {
			data: { user },
			error
		} = await event.locals.supabaseServer.auth.getUser();
		if (error) {
			return { session: null, user: null };
		}

		const {
			data: { session }
		} = await event.locals.supabaseServer.auth.getSession(); //https://github.com/supabase/auth-js/issues/873

		return { session, user };
	};

	//get user session
	const { session, user } = await safeGetSession();

	//load to locals
	event.locals.session = session;
	event.locals.user = user;

	//TODO: make some nice function to check over all protected routes
	if (event.url.pathname.startsWith('/dashboard')) {
		if (!event.locals.user) throw redirect(303, '/');
	}

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range';
		}
	});
};
