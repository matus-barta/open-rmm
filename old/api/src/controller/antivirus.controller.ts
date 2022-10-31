import { Request, Response } from 'express';
import log from '../utils/logger';
import { CreateAntivirusInput } from '../schema/antivirus.schema';
import { createAntivirus } from '../service/antivirus.service';

export async function createAntivirusHandler(
	// eslint-disable-next-line @typescript-eslint/ban-types
	req: Request<{}, {}, CreateAntivirusInput['body']>,
	res: Response
) {
	let status = 200;

	log.info(`➡️  : Received antivirus from ${req.body.UUID}`);

	try {
		const systemInfo = await createAntivirus({
			Computer: req.body.UUID,
			AVname: req.body.AVName,
			UpdateStatus: req.body.UpdateStatus,
			ProtectionStatus: req.body.ProtectionStatus
		});
		return res.send(systemInfo);
	} catch (error) {
		status = 500;
		log.error(error);
	}
	return res.sendStatus(status);
}
