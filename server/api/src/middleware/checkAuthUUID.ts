import { get } from 'lodash';
import { Request, Response, NextFunction } from 'express';
import { findUUID } from '../service/computer.service';
import log from '../utils/logger';

const checkAuthUUID = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const deviceUUID = get(req, 'Device-UUID', '');
		if (!deviceUUID) {
			log.warn(`Unauthenticated request ➡️ UUID: ${deviceUUID}, IP: ${req.ip}`);
			return res.status(403);
		}

		const query = await findUUID({ UUID: deviceUUID, IsAllowed: true });
		if (!query) {
			log.warn(`Unauthenticated request ➡️ UUID: ${deviceUUID}, IP: ${req.ip}`);
			return res.status(403);
		}
		return next();
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (e: any) {
		log.error(e);
		return res.status(400);
	}
};

export default checkAuthUUID;
