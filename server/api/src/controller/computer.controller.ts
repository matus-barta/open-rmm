import { Request, Response } from 'express';
import { CreateComputerInput, UpdateComputerInput } from '../schema/computer.schema';
import { createComputer, updateComputer } from '../service/computer.service';
import log from '../utils/logger';
import { omit } from 'lodash';

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
		//TODO: Add check if it is already added
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
