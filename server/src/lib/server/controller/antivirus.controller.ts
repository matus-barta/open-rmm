import log from '../../utils/logger';
import { createAntivirus } from '../service/antivirus.service';

export async function createAntivirusHandler() {
	let status = 200;

	try {
		return;
	} catch (error) {
		status = 500;
		log.error(error);
	}
	return;
}
