import { Request, Response } from 'express';
import { ComputerInput } from '../schema/computer.schema';
import { prisma } from 'database';

// eslint-disable-next-line @typescript-eslint/ban-types
export async function addComputer(req: Request<{}, {}, ComputerInput['body']>, res: Response) {
	console.log(req.body);

	//check if otk exists and is not added and is allowed - return uuid
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

	//if query is 0 otk is not valid
	if (query.length == 0) {
		return res.send({ message: 'Forbidden' });
	} else {
		const query = await prisma.computer.update({
			//add UUID to valid otk
			where: {
				OneTimeKey: req.body.OneTimeKey
			},
			data: {
				Uuid: req.body.UUID,
				IsAdded: true
			},
			select: {
				Uuid: true
			}
		});
		if (query == null) return res.send({ message: 'Internal Error' });
		else return res.send(query);
	}
}
