import { listOrgUnitsHandler } from '$lib/server/controller/computer.controller';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	return listOrgUnitsHandler();
};
