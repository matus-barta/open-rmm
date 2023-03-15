import {
	createComputer,
	listComputers,
	listComputersFromOrgUnit,
	updateComputer
} from '../service/computer.service';
import type { CreateComputerInput, UpdateComputerInput } from '$lib/schema/computer.schema';
import log from '../../utils/logger';

export async function createComputerHandler(computer: CreateComputerInput) {
	let status = 200;

	try {
		const res = await createComputer(computer.OrgUnit.toLowerCase());

		return new Response(JSON.stringify(res), {
			headers: {
				'Content-Type': 'application/json'
			}
		});
	} catch (error) {
		status = 500;
		log.error(error);
	}
	return new Response('Error', { status });
}

export async function updateComputerHandler(computer: UpdateComputerInput) {
	let status = 200;

	try {
		//TODO: Add check if it's already added
		const res = await updateComputer(computer.UUID, computer.OneTimeKey);
		if (!res) {
			status = 400;
		}
		return new Response(JSON.stringify(res), {
			headers: {
				'Content-Type': 'application/json'
			}
		});
	} catch (error) {
		status = 500;
		log.error(error);
	}
	return new Response('Error', { status });
}

export async function listComputersHandler() {
	let status = 200;
	try {
		const res = await listComputers();

		return new Response(JSON.stringify(res));
	} catch (error) {
		status = 400;
		log.error(error);
	}
	return new Response('Error', { status });
}

export async function listComputersFromOrgUnitHandler(orgUnit: string) {
	let status = 200;
	try {
		const res = await listComputersFromOrgUnit(orgUnit.toLowerCase());

		return new Response(JSON.stringify(res), {
			headers: {
				'Content-Type': 'application/json'
			}
		});
	} catch (error) {
		status = 400;
		log.error(error);
	}
	return new Response('Error', { status });
}
