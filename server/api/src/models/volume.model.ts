import mongoose from 'mongoose';
import { ComputerDocument } from './computer.model';

export interface VolumeDocument extends mongoose.Document {
	Computer: ComputerDocument['UUID'];
	UniqueVolumeID: string;
	VolumeName: string;
	VolumeLetter: string;
	HealthStatus: string;
	SizeRemaining: number;
	Size: number;
}

export const VolumeSchema = new mongoose.Schema({
	Computer: { type: mongoose.Schema.Types.String, ref: 'Computer', required: true },
	UniqueVolumeID: { type: String, required: true },
	VolumeName: { type: String },
	VolumeLetter: { type: String },
	HealthStatus: { type: String, required: true },
	SizeRemaining: { type: Number, required: true },
	Size: { type: Number, required: true }
});

const VolumeModel = mongoose.model<VolumeDocument>('Volume', VolumeSchema);
export default VolumeModel;
