import { Request, Response } from 'express';
import { ComputerInput } from '../schema/computer.schema';
import { prisma } from 'database';

// eslint-disable-next-line @typescript-eslint/ban-types
export async function addComputer(req: Request<{}, {}, ComputerInput['body']>, res: Response) {
	console.log(req.body);
	const query = prisma.computer.findFirst({
		where: {
			OneTimeKey: req.body.OneTimeKey
		},
		include: {
			_count: true
		}
	});

	return res.send(query);
}

// eslint-disable-next-line @typescript-eslint/ban-types
export async function test(req: Request<{}, {}, {}>, res: Response) {
	const query = await prisma.computer.findMany();

	console.log(query);
	return res.send(query);
}
