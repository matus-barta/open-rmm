import type { LayoutLoad } from './$types';
import { get_computer_count_in_org_unit, get_org_units } from '$lib/db/orgUnit';

export const load: LayoutLoad = async ({ parent }) => {
	const { supabase } = await parent();

	type OrgUnit = {
		count: number;
		orgUnit: {
			uuid: string;
			name: string;
			color: string | null;
			icon_id: number;
		};
	};

	const data = get_org_units(supabase)
		.then((data) => {
			let orgUnits: OrgUnit[] = [];
			data.forEach(async (orgUnit) => {
				get_computer_count_in_org_unit(supabase, orgUnit.uuid).then((count) => {
					orgUnits.push({ count, orgUnit });
				});
			});
			return orgUnits;
		})
		.then((orgUnits) => orgUnits);

	console.log(await data);
};
