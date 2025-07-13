import type { LayoutLoad } from './$types';
import { get_tenant } from '$lib/db/tenant';
import { get_profile } from '$lib/db/user';

export const load: LayoutLoad = async ({ parent, fetch }) => {
	const { supabase, user } = await parent();

	const ghUrl = 'https://api.github.com/repos/matus-barta/Open_RMM';
	const res = await fetch(ghUrl);

	interface ghApi {
		watchers: number;
	}

	const ghRes: ghApi = await res.json();

	if (user) {
		const profile = await get_profile(supabase, user.id);
		const tenant = await get_tenant(supabase, profile.tenant_id);

		return {
			profile,
			tenant,
			ghStars: ghRes.watchers
		};
	}
};
