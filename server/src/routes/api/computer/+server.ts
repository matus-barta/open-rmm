import {
	createComputerHandler,
	updateComputerHandler,
	listComputersHandler
} from '$lib/server/controller/computer.controller';
import { createComputerSchema, updateComputerSchema } from '$lib/schema/computer.schema';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	return listComputersHandler();
};

//creating computer from dashboard
//TODO: check for permissions to can add computer
export const POST: RequestHandler = async ({ request }) => {
	return createComputerHandler(createComputerSchema.parse(await request.json()));
};

//add computer during client installation
export const PUT: RequestHandler = async ({ request }) => {
	return updateComputerHandler(updateComputerSchema.parse(await request.json()));
};
