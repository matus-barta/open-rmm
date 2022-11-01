import { Request, Response } from 'express';
import log from '../utils/logger';

import { createUpdate } from '../service/update.service';

export async function createUpdateHandler() {
	let status = 200;

	try {
		/*const systemInfo = await createUpdate({
			/*Computer: req.body.UUID,
			Titles: req.body.Titles
		});*/
		return; //res.send(systemInfo);
	} catch (error) {
		status = 500;
		log.error(error);
	}
	return; //res.sendStatus(status);
}
