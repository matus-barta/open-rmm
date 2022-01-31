import ComputerModel, { ComputerDocument } from '../models/computer.model';
import { nanoid } from 'nanoid';
import { FilterQuery, UpdateQuery } from 'mongoose';
import log from '../utils/logger';

export async function createComputer(OrgUnit: string) {
	try {
		const OneTimeKey = nanoid(64); //generate unique one time key
		log.warn(`Generated new OneTimeKey: ${OneTimeKey}`);

		return await ComputerModel.create({ OrgUnit, OneTimeKey });
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (e: any) {
		throw new Error(e);
	}
}

export async function updateComputer(
	query: FilterQuery<ComputerDocument>,
	update: UpdateQuery<ComputerDocument>
) {
	return ComputerModel.updateOne(query, update);
}

export async function findUUID(query: FilterQuery<ComputerDocument>) {
	return ComputerModel.findOne(query).lean();
}
