import { Request, Response } from 'express';
import { CreateComputerInput, UpdateComputerInput } from '../schema/computer.schema';
import { createComputer, updateComputer } from '../service/computer.service';
import log from '../utils/logger';

export async function createComputerHandler(
	// eslint-disable-next-line @typescript-eslint/ban-types
	req: Request<{}, {}, CreateComputerInput['body']>,
	res: Response
) {
	let status = 200;

	try {
		//const computer = await createComputer(req.body);
		//return res.send(computer);
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
		const computer = await updateComputer(
			{ OneTimeKey: req.body.OneTimeKey },
			{ UUID: req.body.UUID }
		);
		return res.send(computer);
	} catch (error) {
		status = 400;
		log.error(error);
	}
	return res.sendStatus(status);
}
