import { Request, Response } from 'express';
import { SystemInfoInput } from '../schema/systemInfo.schema';
import { prisma } from 'database';
import log from '../utils/logger';

export async function updateSystemInfo(
	// eslint-disable-next-line @typescript-eslint/ban-types
	req: Request<{}, {}, SystemInfoInput['body']>,
	res: Response
) {
	const sysInfo = req.body;

	log.info(`System info update from: ${sysInfo.UUID}`);

	//update computer based on UUID
	const query = await prisma.computer.update({
		where: {
			Uuid: sysInfo.UUID
		},
		data: {
			SystemInfo: {
				upsert: {
					update: {
						ComputerName: sysInfo.ComputerName,
						KernelVersion: sysInfo.KernelVersion,
						LastBootupTime: sysInfo.LastBootUpTime,
						Type: sysInfo.Type,
						OsName: sysInfo.OsName,
						OsVersion: sysInfo.OsVersion,
						PendingReboot: sysInfo.PendingReboot.toLowerCase() == 'true'
					},
					create: {
						ComputerName: sysInfo.ComputerName,
						KernelVersion: sysInfo.KernelVersion,
						LastBootupTime: sysInfo.LastBootUpTime,
						Type: sysInfo.Type,
						OsName: sysInfo.OsName,
						OsVersion: sysInfo.OsVersion,
						PendingReboot: sysInfo.PendingReboot.toLowerCase() == 'true'
					}
				}
			}
		},
		select: {
			Uuid: true
		}
	});

	return res.send(query);
}
