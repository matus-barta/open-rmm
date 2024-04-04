import type { LayoutLoad } from './$types';
import { supabase } from '$lib/supabase';
import { error } from '@sveltejs/kit';

export const load: LayoutLoad = async () => {
	const { data: org_unit, error: db_error } = await supabase.from('org_unit').select();
	if (!org_unit) throw error(404, db_error);

	console.log(JSON.stringify(org_unit));
	return { org_unit };
};
