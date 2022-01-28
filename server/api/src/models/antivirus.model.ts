import mongoose from 'mongoose';
import { ComputerDocument } from './computer.model';

export interface AntivirusDocument extends mongoose.Document {
	Computer: ComputerDocument['UUID'];
	AVname: string;
	UpdateStatus: string;
	ProtectionStatus: string;
}

export const AntivirusSchema = new mongoose.Schema(
	{
		Computer: { type: mongoose.Types.ObjectId, ref: 'Computer', required: true },
		AVName: { type: String, required: true },
		UpdateStatus: { type: String, required: true },
		ProtectionStatus: { type: String, required: true }
	},
	{
		timestamps: true
	}
);

const AntivirusModel = mongoose.model<AntivirusDocument>('Antivirus', AntivirusSchema);
export default AntivirusModel;
