import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
//import { supabaseServiceClient } from '$lib/server/supabase';

export const load: PageLoad = async (event) => {
	//computers: trpc(event).computers.list.query(event.params.slug)
	/*const { data: computers, error: db_error } = await supabaseServiceClient
		.from('computers')
		.select()
		.eq('org_unit_id', event.params.slug);
	if (!computers) throw error(404, db_error); //TODO: log error and show some client friendly msg

	console.log(JSON.stringify(computers));
	return { computers };*/
};
