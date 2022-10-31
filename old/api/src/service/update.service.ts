import { DocumentDefinition } from 'mongoose';
import UpdateModel, { UpdateDocument } from '../models/update.model';

export async function createUpdate(input: DocumentDefinition<UpdateDocument>) {
	try {
		return await UpdateModel.create(input);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (e: any) {
		throw new Error(e);
	}
}
