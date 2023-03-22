import { Request, Response } from 'express';
import { ComputerInput } from '../schema/computer.schema';
import { prisma } from 'database';

// eslint-disable-next-line @typescript-eslint/ban-types
export async function addComputer(req: Request<{}, {}, ComputerInput['body']>, res: Response) {
	console.log(req.body);

	const query = await prisma.computer.findMany({
		where: {
			OneTimeKey: req.body.OneTimeKey,
			IsAdded: false,
			IsAllowed: true
		},
		select: {
			Uuid: true
		}
	});

	console.log(query);

	if (query.length == 0) return res.send({ message: 'Forbidden' });
	else return res.send(query);
}

// eslint-disable-next-line @typescript-eslint/ban-types
export async function test(req: Request<{}, {}, {}>, res: Response) {
	const query = await prisma.computer.findMany();

	return res.send(query);
}
