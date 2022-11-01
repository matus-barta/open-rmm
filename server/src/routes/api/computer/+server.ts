import { createComputerHandler } from '$lib/server/controller/computer.controller';
import { json } from '@sveltejs/kit';
import { createComputerSchema } from '$lib/schema/computer.schema';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	return json({ status: 'OK' });
};

//creating computer from dashboard
//TODO: check for permissions to can add computer
export const POST: RequestHandler = async ({ request }) => {
	return createComputerHandler(createComputerSchema.parse(await request.json()));
};
