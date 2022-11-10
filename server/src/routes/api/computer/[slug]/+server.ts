import { listComputersFromOrgUnitHandler } from '$lib/server/controller/computer.controller';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async (event) => {
	return listComputersFromOrgUnitHandler(event.params.slug);
};
