import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const response = await fetch(`/api/computer`);
	const computer = (await response.json()) as { OneTimeKey: string; OrgUnit: string };

	return {
		computer
	};
};
