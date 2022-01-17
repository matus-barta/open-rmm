import { DocumentDefinition } from 'mongoose';
import SystemInfoModel, { SystemInfoDocument } from '../models/systemInfo.model';

export async function createSystemInfo(input: DocumentDefinition<SystemInfoDocument>) {
	try {
		return await SystemInfoModel.create(input);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (e: any) {
		throw new Error(e);
	}
}
