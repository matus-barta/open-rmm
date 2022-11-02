import { createComputer, listComputers, updateComputer } from '../service/computer.service';
import type { CreateComputerInput, UpdateComputerInput } from '$lib/schema/computer.schema';
import log from '../utils/logger';

export async function createComputerHandler(computer: CreateComputerInput) {
	let status = 200;

	try {
		const res = await createComputer(computer.OrgUnit);
		return new Response(JSON.stringify({ OneTimeKey: res.OneTimeKey, OrgUnit: res.OrgUnit }));
	} catch (error) {
		status = 500;
		log.error(error);
	}
	return new Response('Internal Server Error', { status });
}

export async function updateComputerHandler(computer: UpdateComputerInput) {
	let status = 200;

	try {
		//TODO: Add check if it's already added
		const res = await updateComputer(computer.UUID, computer.OneTimeKey);
		if (!res) {
			status = 400;
		}
	} catch (error) {
		status = 500;
		log.error(error);
	}
	return new Response('Internal Server Error', { status });
}

export async function listComputersHandler() {
	let status = 200;
	try {
		const listOfComputers = await listComputers();

		return; //res.send(JSON.stringify(computers));
	} catch (error) {
		status = 400;
		log.error(error);
	}
	return; //res.sendStatus(status);
}
