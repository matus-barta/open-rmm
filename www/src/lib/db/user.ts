import { error } from '@sveltejs/kit';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

export const get_profile = async (supabaseClient: SupabaseClient<Database>, user_uuid: string) => {
	console.log(user_uuid);
	const { data: profile, error: db_error } = await supabaseClient
		.from('profiles')
		.select('photo, full_name, tenant_id')
		.eq('uuid', user_uuid)
		.limit(1)
		.single();
	if (!profile) {
		console.log(db_error);
		throw error(404, db_error);
	} //TODO: log error and show some client friendly msg
	return profile;
};
