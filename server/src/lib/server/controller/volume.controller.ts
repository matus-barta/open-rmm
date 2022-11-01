import log from '../utils/logger';
import { createVolume } from '../service/volume.service';

export async function createVolumeHandler() {
	let status = 200;

	try {
		//const systemInfo = await createVolume({		});
		return; //res.send(systemInfo);
	} catch (error) {
		status = 500;
		log.error(error);
	}
	return; //res.sendStatus(status);
}
