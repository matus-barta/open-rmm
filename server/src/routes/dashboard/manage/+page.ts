import type { ReadOrgUnitInput } from '$lib/schema/orgUnit.schema';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const response = await fetch(`/api/orgunit`);

	const orgUnits = (await response.json()) as ReadOrgUnitInput[];

	return {
		orgUnits
	};
};

export const addComputer = (orgUnit: string) => {
	orgUnit;
};
