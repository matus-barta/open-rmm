import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { supabase } from '$lib/supabase';

export const load: PageLoad = async (event) => {
	//computers: trpc(event).computers.list.query(event.params.slug)
	const { data: computer, error: db_error } = await supabase
		.from('computer')
		.select()
		.eq('org_unit_id', event.params.slug);
	if (!computer) throw error(404, db_error);

	console.log(JSON.stringify(computer));
	return { computer };
};
