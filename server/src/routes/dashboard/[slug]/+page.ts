import type { PageLoad } from './$types';
import type { ReadComputerInput } from '$lib/schema/computer.schema';

export const load: PageLoad = async ({ fetch, params }) => {
	const response = await fetch(`/api/computer/${params.slug}`);
	const computers = (await response.json()) as ReadComputerInput[];

	return {
		computers
	};
};
