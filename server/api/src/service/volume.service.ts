import { DocumentDefinition } from 'mongoose';
import VolumeModel, { VolumeDocument } from '../models/volume.model';

export async function createVolume(input: DocumentDefinition<VolumeDocument>) {
	try {
		return await VolumeModel.create(input);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (e: any) {
		throw new Error(e);
	}
}
