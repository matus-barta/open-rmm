import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { supabase } from '$lib/supabase';

export const load: PageLoad = async (event) => {
	//computers: trpc(event).computers.list.query(event.params.slug)
	const { data: computer_with_system_info, error: db_error } = await supabase
		.from('computer_with_system_info')
		.select()
		.eq('org_unit_id', event.params.slug);
	if (!computer_with_system_info) throw error(404, db_error); //TODO: log error and show some client friendly msg

	console.log(JSON.stringify(computer_with_system_info));
	return { computer_with_system_info };
};
