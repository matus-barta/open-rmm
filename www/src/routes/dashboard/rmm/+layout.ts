import type { LayoutLoad } from './$types';
import { supabase } from '$lib/supabase';
import { error } from '@sveltejs/kit';

export const load: LayoutLoad = async () => {
	const { data: org_unit_with_count, error: db_error } = await supabase
		.from('org_unit_with_count')
		.select();
	if (!org_unit_with_count) throw error(404, db_error); //TODO: log error and show some client friendly msg

	console.log(JSON.stringify(org_unit_with_count));
	return { org_unit_with_count };
};
