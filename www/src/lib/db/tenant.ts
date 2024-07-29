import { error } from '@sveltejs/kit';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

export const get_tenant = async (supabaseClient: SupabaseClient<Database>, tenant_uuid: string) => {
	const { data: tenant, error: db_error } = await supabaseClient
		.from('tenants')
		.select('name')
		.eq('uuid', tenant_uuid)
		.limit(1) //https://supabase.com/docs/reference/javascript/single
		.single();
	if (!tenant) {
		console.log(db_error);
		throw error(404, db_error);
	} //TODO: log error and show some client friendly msg
	return tenant;
};

export const get_tenant_id_by_user_id = async (
	supabaseClient: SupabaseClient<Database>,
	user_uuid: string
) => {
	const { data: tenant, error: db_error } = await supabaseClient
		.from('profiles')
		.select('tenant_id')
		.eq('uuid', user_uuid)
		.limit(1) //https://supabase.com/docs/reference/javascript/single
		.single();
	if (!tenant) {
		console.log(db_error);
		throw error(404, db_error);
	} //TODO: log error and show some client friendly msg
	return tenant.tenant_id;
};
