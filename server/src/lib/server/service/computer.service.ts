import { nanoid } from 'nanoid';
import prisma from '../db/prisma';
import log from '../utils/logger';

export async function createComputer(OrgUnit: string) {
	try {
		const OneTimeKey = nanoid(64); //generate unique one time key
		log.warn(` ⚠ : Generated new OneTimeKey: ${OneTimeKey}`);

		return await prisma.computer.create({
			data: {
				OneTimeKey: OneTimeKey,
				OrgUnit: OrgUnit
			}
		});
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (e: any) {
		throw new Error(e);
	}
}

export async function updateComputer() {
	//log.info(` ⚠ : Updated UUID: ${update.UUID}`);
	//return ComputerModel.updateOne(query, update);
}

export async function findUUID() {
	//return ComputerModel.findOne(query).lean();
}

export async function listComputers() {
	//return ComputerModel.find();
}

export async function updateLastUpdate() {
	//return updateComputer(query, { updatedAt: Date.now() });
}
