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

export async function listComputers() {
	return await prisma.computer.findMany({
		select: {
			Uuid: true,
			ComputerOrgUnit: true,
			IsAdded: true,
			IsAllowed: true,
			CreatedAt: true
		}
	});
}

export async function listComputersFromOrgUnit(orgUnit: string) {
	return await prisma.computer.findMany({
		where: {
			OrgUnit: orgUnit
		},
		select: {
			Uuid: true,
			IsAdded: true,
			IsAllowed: true,
			CreatedAt: true
		}
	});
}

export async function listOrgUnits() {
	return await prisma.orgUnit.findMany({
		select: {
			Id: true,
			OrgUnitName: true
		}
	});
}

export async function updateLastUpdate() {
	//return updateComputer(query, { updatedAt: Date.now() });
}
