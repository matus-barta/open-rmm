import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './database.types';
import { error } from '@sveltejs/kit';
import { OneTimeKey } from '$lib/utils/generators';

/**
 * Add computer return OTK
 * @param supabaseClient
 * @param org_unit_uuid
 * @param tenant_uuid
 * @param is_allowed
 * @returns
 */
export const add_computer = async (
	supabaseClient: SupabaseClient<Database>,
	org_unit_uuid: string,
	is_allowed?: boolean
) => {
	 
	const { data: db_req_data, error: db_error } = await supabaseClient
		.from('computers')
		.insert([{ one_time_key: OneTimeKey(), is_allowed, org_unit_uuid }])
		.select('one_time_key')
		.limit(1)
		.single();
	if (db_error) {
		console.log(db_error);
		throw error(404, db_error);
	} //TODO: log error and show some client friendly msg
	return db_req_data.one_time_key;
};
