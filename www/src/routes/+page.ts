import type { PageLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { defaultRoute } from '$lib/config';

export const load: PageLoad = () => {
	throw redirect(307, defaultRoute);
};
