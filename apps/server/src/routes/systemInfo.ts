import { Request, Response } from 'express';
import { SystemInfoInput } from '../schema/systemInfo.schema';
import { prisma } from 'database';

export async function updateSystemInfo(
	// eslint-disable-next-line @typescript-eslint/ban-types
	req: Request<{}, {}, SystemInfoInput['body']>,
	res: Response
) {
	const sysInfo = req.body;

	//update computer based on UUID
	const query = await prisma.computer.update({
		where: {
			Uuid: sysInfo.UUID
		},
		data: {
			SystemInfos: {
				create: {
					ComputerName: sysInfo.ComputerName,
					KernelVersion: sysInfo.KernelVersion,
					LastBootupTime: sysInfo.LastBootUpTime,
					Type: sysInfo.Type,
					OsName: sysInfo.OsName,
					OsVersion: sysInfo.OsVersion,
					PendingReboot: sysInfo.PendingReboot
				}
			}
		}
	});

	return res.send(query);
}
