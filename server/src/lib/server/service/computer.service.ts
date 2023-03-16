import { nanoid } from 'nanoid';
import prisma from '../db/prisma';
import log from '../../utils/logger';

export async function createComputer(OrgUnit: string) {
	try {
		const OneTimeKey = nanoid(64); //generate unique one time key
		log.warn(` ⚠ : Generated new OneTimeKey: ${OneTimeKey}`);

		return await prisma.computer.create({
			data: {
				OneTimeKey,
				ComputerOrgUnit: {
					connectOrCreate: {
						where: {
							OrgUnitName: OrgUnit
						},
						create: {
							OrgUnitName: OrgUnit
						}
					}
				}
			},
			select: {
				OneTimeKey: true,
				OrgUnit: true
			}
		});
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (e: any) {
		throw new Error(e);
	}
}

export async function updateComputer(Uuid: string, OneTimeKey: string) {
	log.info(` ⚠ : Updated UUID: ${Uuid}`);
	return await prisma.computer.update({
		where: {
			OneTimeKey
		},
		data: {
			Uuid,
			IsAdded: true
		},
		select: {
			Uuid: true,
			OneTimeKey: true,
			IsAdded: true
		}
	});
}

export async function findUUID() {
	//return ComputerModel.findOne(query).lean();
}
