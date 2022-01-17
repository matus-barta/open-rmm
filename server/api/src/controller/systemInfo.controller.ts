import { Request, Response } from 'express';
import { CreateSystemInfoInput } from '../schema/systemInfo.schema';
import { createSystemInfo } from '../service/systemInfo.service';
import log from '../utils/logger';

export async function createSystemInfoHandler(
	// eslint-disable-next-line @typescript-eslint/ban-types
	req: Request<{}, {}, CreateSystemInfoInput['body']>,
	res: Response
) {
	let status = 200;
	const deviceUUID = req.header('Device-UUID') as string;
	if (deviceUUID == '' || deviceUUID == undefined) {
		status = 403;
		return res.sendStatus(status);
	}

	log.info('➡️  : Received systemInfo from ' + deviceUUID);

	try {
		const systemInfo = await createSystemInfo(req.body);
		return res.send(systemInfo);
	} catch (error) {
		status = 500;
		log.error(error);
	}
	return res.sendStatus(status);
}
