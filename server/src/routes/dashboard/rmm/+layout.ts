import type { LayoutLoad } from './$types';
import type { ReadOrgUnitInput } from '$lib/schema/orgUnit.schema';

export const load: LayoutLoad = async ({ fetch }) => {
	const response = await fetch(`/api/orgunit`);

	const orgUnits = (await response.json()) as ReadOrgUnitInput[];

	return {
		orgUnits
	};
};
