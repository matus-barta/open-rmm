import { Request, Response } from 'express';
import log from '../utils/logger';
import { CreateVolumeInput } from '../schema/volume.schema';
import { createVolume } from '../service/volume.service';

export async function createSystemInfoHandler(
	// eslint-disable-next-line @typescript-eslint/ban-types
	req: Request<{}, {}, CreateVolumeInput['body']>,
	res: Response
) {
	let status = 200;

	log.info(`➡️  : Received volume from ${req.body.UUID}`);

	try {
		const systemInfo = await createVolume({
			Computer: req.body.UUID,
			UniqueVolumeID: req.body.UniqueVolumeID,
			VolumeName: req.body.VolumeName,
			VolumeLetter: req.body.VolumeLetter,
			HealthStatus: req.body.HealthStatus,
			SizeRemaining: req.body.SizeRemaining,
			Size: req.body.Size
		});
		return res.send(systemInfo);
	} catch (error) {
		status = 500;
		log.error(error);
	}
	return res.sendStatus(status);
}
