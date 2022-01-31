import mongoose from 'mongoose';

export interface ComputerDocument extends mongoose.Document {
	UUID: string;
	OneTimeKey: string;
	OrgUnit: string;
	IsAdded: boolean;
	IsAllowed: boolean;
}

export const ComputerSchema = new mongoose.Schema(
	{
		UUID: { type: String, unique: true },
		OneTimeKey: { type: String, required: true, unique: true },
		OrgUnit: { type: String, required: true },
		IsAdded: { type: Boolean, default: false },
		IsAllowed: { type: Boolean, default: true }
	},
	{
		timestamps: true
	}
);

const ComputerModel = mongoose.model<ComputerDocument>('Computer', ComputerSchema);
export default ComputerModel;
