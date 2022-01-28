import mongoose from 'mongoose';

export interface ComputerDocument extends mongoose.Document {
	UUID: string;
	OneTimeKey: string;
	OrgUnit: string;
}

export const ComputerSchema = new mongoose.Schema(
	{
		UUID: { type: String, required: true, unique: true },
		OneTimeKey: { type: String, required: true },
		OrgUnit: { type: String, required: true }
	},
	{
		timestamps: true
	}
);

const ComputerModel = mongoose.model<ComputerDocument>('Computer', ComputerSchema);
export default ComputerModel;
