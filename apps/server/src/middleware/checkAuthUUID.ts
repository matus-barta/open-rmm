import { Request, Response, NextFunction } from 'express';
import { prisma } from 'database';
import log from '../utils/logger';

const checkAuthUUID = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const deviceUUID = req.header('Device-UUID') as string;
		if (deviceUUID == '' || deviceUUID == undefined) {
			log.warn(`➡️ : Unauthenticated request - missing UUID, IP: ${req.ip}`);
			return res.sendStatus(403);
		}

		const uuidExists = await checkUUID(deviceUUID);
		if (!uuidExists) {
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

async function checkUUID(uuid: string) {
	const query = await prisma.computer.findMany({
		where: {
			Uuid: uuid,
			IsAllowed: true
		}
	});

	return query.length > 0 && query.length < 2;
}

export default checkAuthUUID;
