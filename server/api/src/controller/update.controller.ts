import { Request, Response } from 'express';
import log from '../utils/logger';
import { CreateUpdateInput } from '../schema/update.schema';
import { createUpdate } from '../service/update.service';

export async function createUpdateHandler(
	// eslint-disable-next-line @typescript-eslint/ban-types
	req: Request<{}, {}, CreateUpdateInput['body']>,
	res: Response
) {
	let status = 200;

	log.info(`➡️  : Received update from ${req.body.UUID}`);

	try {
		const systemInfo = await createUpdate({
			Computer: req.body.UUID,
			Titles: req.body.Titles
		});
		return res.send(systemInfo);
	} catch (error) {
		status = 500;
		log.error(error);
	}
	return res.sendStatus(status);
}
