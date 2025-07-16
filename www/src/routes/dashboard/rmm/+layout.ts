import type { LayoutLoad } from './$types';
import { get_computer_count_in_org_unit, get_org_units } from '$lib/db/orgUnit';

export const load: LayoutLoad = async ({ parent }) => {
	const { supabase } = await parent();

	type OrgUnit = {
		count: number;
		orgUnit: {
			uuid: string;
			name: string;
			color: number;
			icon_id: number;
		};
	};

	const data = await get_org_units(supabase);

	const orgUnits: OrgUnit[] = await Promise.all(
		data.map(async (orgUnit) => {
			const count = await get_computer_count_in_org_unit(supabase, orgUnit.uuid);
			return { count, orgUnit };
		})
	);

	return {
		orgUnits
	};
};
