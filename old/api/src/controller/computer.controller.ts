import { Request, Response } from 'express';
import { CreateComputerInput, UpdateComputerInput } from '../schema/computer.schema';
import { createComputer, listComputers, updateComputer } from '../service/computer.service';
import { getSystemInfo } from '../service/systemInfo.service';
import log from '../utils/logger';
import { omit } from 'lodash';
import IComputer from 'common-open_rmm/types/computer';

export async function createComputerHandler(
	// eslint-disable-next-line @typescript-eslint/ban-types
	req: Request<{}, {}, CreateComputerInput['body']>,
	res: Response
) {
	let status = 200;

	try {
		const computer = await createComputer(req.body.OrgUnit);
		return res.send(omit(computer.toJSON(), 'IsAdded', 'IsAllowed'));
	} catch (error) {
		status = 500;
		log.error(error);
	}
	return res.sendStatus(status);
}

export async function updateComputerHandler(
	// eslint-disable-next-line @typescript-eslint/ban-types
	req: Request<{}, {}, UpdateComputerInput['body']>,
	res: Response
) {
	let status = 200;

	try {
		//TODO: Add check if it's already added
		const computer = await updateComputer(
			{ OneTimeKey: req.body.OneTimeKey },
			{ UUID: req.body.UUID, IsAdded: true }
		);

		if (!computer) {
			status = 400;
		}
	} catch (error) {
		status = 400;
		log.error(error);
	}
	return res.sendStatus(status);
}

export async function listComputersHandler(req: Request, res: Response) {
	let status = 200;
	try {
		const listOfComputers = await listComputers();
		// eslint-disable-next-line prefer-const
		let computers: { [UUID: string]: IComputer } = {};

		for (const element of listOfComputers) {
			const systemInfo = await getSystemInfo(element.UUID);
			computers[element.UUID] = {
				OrgUnit: element.OrgUnit,
				PendingReboot: systemInfo?.PendingReboot,
				ComputerName: systemInfo?.ComputerName,
				LastBootUpTime: systemInfo?.LastBootUpTime,
				OsVersion: systemInfo?.OsVersion,
				OsName: systemInfo?.OsName,
				LastUpdate: element.updatedAt
			};
		}

		return res.send(JSON.stringify(computers));
	} catch (error) {
		status = 400;
		log.error(error);
	}
	return res.sendStatus(status);
}
