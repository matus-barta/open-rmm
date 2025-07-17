import { get_computers_in_org_unit, get_org_unit_name } from '$lib/db/orgUnit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent, params }) => {
	const { supabase } = await parent();

	return {
		orgUnitName: await get_org_unit_name(supabase, params.slug),
		computers: await get_computers_in_org_unit(supabase, params.slug)
	};
};
