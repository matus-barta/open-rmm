import { DocumentDefinition } from 'mongoose';
import AntivirusModel, { AntivirusDocument } from '../models/antivirus.model';

export async function createAntivirus(input: DocumentDefinition<AntivirusDocument>) {
	try {
		return await AntivirusModel.create(input);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (e: any) {
		throw new Error(e);
	}
}
