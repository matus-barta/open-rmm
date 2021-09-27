import mongoose from 'mongoose';

export const VolumesSchema = new mongoose.Schema({
	Time: { type: Date, required: true },
	UUID: { type: String, required: true },
	DriveLetter: { type: String, required: true },
	HealthStatus: { type: String, required: true },
	SizeRemaining: { type: Number, required: true },
	Size: { type: Number, required: true },
	DriveName: { type: String, required: false },
	UniqueID: { type: String, required: true }
});

const Volumes = mongoose.model('Volumes', VolumesSchema);
export default Volumes;
