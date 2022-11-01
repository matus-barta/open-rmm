import { createSystemInfo } from '../service/systemInfo.service';
import log from '../utils/logger';

export async function createSystemInfoHandler() {
	let status = 200;
	try {
		//const systemInfo = await createSystemInfo({});
		return; //res.send(systemInfo);
	} catch (error) {
		status = 500;
		log.error(error);
	}
	return; // res.sendStatus(status);
}
