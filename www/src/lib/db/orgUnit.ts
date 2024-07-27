import { error } from '@sveltejs/kit';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

export const get_computer_count_in_org_unit = async (
	supabaseClient: SupabaseClient<Database>,
	org_unit_uuid: string
): Promise<number> => {
	const { count, error: db_error } = await supabaseClient
		.from('computers')
		.select('*', { count: 'exact', head: true }) // https://supabase.com/docs/guides/database/sql-to-api
		.eq('org_unit_uuid', org_unit_uuid);
	if (count == null || db_error != null) {
		const error_msg = db_error ? db_error : 'count is null';

		console.log(db_error);
		throw error(500, error_msg);
	} // TODO: log error and show some client friendly msg
	return count;
};

export const get_org_units = async (supabaseClient: SupabaseClient<Database>) => {
	const { data: org_units, error: db_error } = await supabaseClient
		.from('org_units')
		.select('uuid, name, color, icon_id');
	if (!org_units) {
		console.log(db_error);
		throw error(404, db_error);
	} // TODO: log error and show some client friendly msg
	return org_units;
};

export const get_org_unit_name = async (
	supabaseClient: SupabaseClient<Database>,
	org_unit_uuid: string
) => {
	const { data: org_unit, error: db_error } = await supabaseClient
		.from('org_units')
		.select('name')
		.eq('uuid', org_unit_uuid)
		.limit(1)
		.single();
	if (!org_unit) {
		console.log(db_error);
		throw error(404, db_error);
	} //TODO: log error and show some client friendly msg
	return org_unit.name;
};

export const get_computers_in_org_unit = async (
	supabaseClient: SupabaseClient<Database>,
	org_unit_uuid: string
) => {
	const { data: computers, error: db_error } = await supabaseClient
		.from('computers')
		.select(
			`uuid,
			is_allowed,
			is_added,
			system_info(
				machine_type,
				pending_reboot,
				computer_name,
				last_bootup_time,
				os_version,
				os_name,
				kernel_version
			)`
		)
		.eq('org_unit_uuid', org_unit_uuid);
	if (!computers) {
		console.log(db_error);
		throw error(404, db_error);
	} //TODO: log error and show some client friendly msg
	return computers;
};

/**
 * WORKS only as service account - RLS only for reads
 * FIXME:fix RLS!
 * @param supabaseClient
 * @param user_id
 * @param org_unit_name
 * @param tenant_id
 * @param color
 * @param icon_id
 */
export const add_org_unit = async (
	supabaseClient: SupabaseClient<Database>,
	user_id: string,
	org_unit_name: string,
	tenant_id: string,
	color?: string,
	icon_id = 0
) => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { data: db_req_data, error: db_error } = await supabaseClient
		.from('org_units')
		.insert([
			{ uuid: user_id, name: org_unit_name, tenant_uuid: tenant_id, color: color, icon_id: icon_id }
		])
		.select();
	if (db_error) {
		console.log(db_error);
		throw error(404, db_error);
	} //TODO: log error and show some client friendly msg
};
