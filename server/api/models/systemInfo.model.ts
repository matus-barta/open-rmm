import mongoose from 'mongoose';

export const SystemInfoSchema = new mongoose.Schema({
    Time: { type: Date, required: true },
    UUID: { type: String, required: true },
    PendingReboot: { type: Boolean },
    ComputerName: { type: String, required: true },
    LastBootUpTime: { type: Date, required: true },
    OsVersion: { type: String, required: true },
    OsName: { type: String, required: true },
    KernelVersion: { type: String, required: true }
});

const SystemInfo = mongoose.model('SystemInfo', SystemInfoSchema);
export default SystemInfo;