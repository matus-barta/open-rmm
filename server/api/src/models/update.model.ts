import mongoose from 'mongoose';
import { ComputerDocument } from './computer.model';

export interface UpdateDocument extends mongoose.Document {
	Computer: ComputerDocument['UUID'];
	Titles: string[];
}

export const UpdateSchema = new mongoose.Schema(
	{
		Computer: { type: mongoose.Schema.Types.String, ref: 'Computer', required: true },
		Titles: [String]
	},
	{
		timestamps: true
	}
);

const UpdateModel = mongoose.model<UpdateDocument>('Update', UpdateSchema);
export default UpdateModel;
