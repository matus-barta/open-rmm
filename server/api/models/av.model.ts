import mongoose from 'mongoose';

export const AvsSchema = new mongoose.Schema({
	Time: { type: Date, required: true },
	UUID: { type: String, required: true },
	AVName: { type: String, required: true },
	UpdateStatus: { type: String, required: true },
	RealTimeProtectionStatus: { type: String, required: true }
});

const AVs = mongoose.model('AVs', AvsSchema);
export default AVs;
