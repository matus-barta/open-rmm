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

	log.info(`➡️  : Received systemInfo from ${req.body.UUID}`);

	try {
		const systemInfo = await createSystemInfo({
			Computer: req.body.UUID,
			PendingReboot: req.body.PendingReboot,
			ComputerName: req.body.ComputerName,
			LastBootUpTime: req.body.LastBootUpTime,
			OsVersion: req.body.OsVersion,
			OsName: req.body.OsName,
			KernelVersion: req.body.KernelVersion
		});
		return res.send(systemInfo);
	} catch (error) {
		status = 500;
		log.error(error);
	}
	return res.sendStatus(status);
}
