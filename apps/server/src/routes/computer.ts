import { Request, Response } from 'express';
import { ComputerInput } from '../schema/computer.schema';
import prisma from '../prisma';

export async function addComputer(req: Request<{}, {}, ComputerInput['body']>, res: Response) {
	console.log(req.body);
	let query = prisma.computer.findFirst({
		where: {
			OneTimeKey: req.body.OneTimeKey
		},
		include: {
			_count: true
		}
	});

	return res.send(query);
}
