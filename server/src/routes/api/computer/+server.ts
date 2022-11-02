import {
	createComputerHandler,
	updateComputerHandler
} from '$lib/server/controller/computer.controller';
import { json } from '@sveltejs/kit';
import { createComputerSchema, updateComputerSchema } from '$lib/schema/computer.schema';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	return json({
		OneTimeKey: 'o1jjRUC5zyLBxL7bk3dbF_orsf0w0d4ypoMVRe0Sr6f4dp03nP1qsfgXvNtdBU0s',
		OrgUnit: 'Default'
	});
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
