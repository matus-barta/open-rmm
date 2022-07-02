import { Request, Response, NextFunction } from 'express';
import { findUUID } from '../service/computer.service';
import log from '../utils/logger';

const checkAuthUUID = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const deviceUUID = req.header('Device-UUID') as string;
		if (deviceUUID == '' || deviceUUID == undefined) {
			log.warn(`➡️ : Unauthenticated request - missing UUID, IP: ${req.ip}`);
			return res.sendStatus(403);
		}

		const query = await findUUID({ UUID: deviceUUID, IsAllowed: true });
		if (!query) {
			log.warn(`➡️ : Unauthenticated request - UUID: ${deviceUUID}, IP: ${req.ip}`);
			return res.sendStatus(403);
		}
		return next();
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (e: any) {
		log.error(e);
		return res.sendStatus(400);
	}
};

export default checkAuthUUID;
