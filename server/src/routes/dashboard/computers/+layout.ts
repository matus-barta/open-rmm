import type { LayoutLoad } from './$types';
import type { CreateOrgUnitInput } from '$lib/schema/orgUnit.schema';

export const load: LayoutLoad = async ({ fetch }) => {
	const response = await fetch(`/api/orgunit`);

	const orgUnits = (await response.json()) as CreateOrgUnitInput[];

	return {
		orgUnits
	};
};
