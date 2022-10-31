import mongoose from 'mongoose';
import { ComputerDocument } from './computer.model';

export interface SystemInfoDocument extends mongoose.Document {
	Computer: ComputerDocument['UUID'];
	PendingReboot: boolean;
	ComputerName: string;
	LastBootUpTime: string;
	OsVersion: string;
	OsName: string;
	KernelVersion: string;
}

export const SystemInfoSchema = new mongoose.Schema({
	Computer: { type: mongoose.Schema.Types.String, ref: 'Computer', required: true },
	PendingReboot: { type: Boolean },
	ComputerName: { type: String, required: true },
	LastBootUpTime: { type: String, required: true },
	OsVersion: { type: String, required: true },
	OsName: { type: String, required: true },
	KernelVersion: { type: String, required: true }
});

const SystemInfoModel = mongoose.model<SystemInfoDocument>('SystemInfo', SystemInfoSchema);
export default SystemInfoModel;
