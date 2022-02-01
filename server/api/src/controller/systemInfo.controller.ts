import { Request, Response } from 'express';
import { CreateSystemInfoInput } from '../schema/systemInfo.schema';
//import { createSystemInfo } from '../service/systemInfo.service';
import log from '../utils/logger';

export async function createSystemInfoHandler(
	// eslint-disable-next-line @typescript-eslint/ban-types
	req: Request<{}, {}, CreateSystemInfoInput['body']>,
	res: Response
) {
	let status = 200;

	log.info(`➡️  : Received systemInfo from ${req.body.UUID}`);

	try {
		/*const systemInfo = await createSystemInfo(req.body);
		return res.send(systemInfo);*/
		return res.sendStatus(200);
	} catch (error) {
		status = 500;
		log.error(error);
	}
	return res.sendStatus(status);
}
