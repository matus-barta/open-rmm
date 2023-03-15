import { object, string, boolean } from 'zod';
import type { TypeOf } from 'zod';
import isIsoDate from '$lib/utils/isoDate';

export const createSystemInfoSchema = object({
	UUID: string({ required_error: 'UUID is missing' }).uuid(),
	PendingReboot: boolean(),
	ComputerName: string({ required_error: 'Computer name is missing' }),
	LastBootUpTime: string({ required_error: 'DateTime is missing' }),
	OsVersion: string({ required_error: 'OS version is missing' }),
	OsName: string({ required_error: 'OS name is missing' }),
	KernelVersion: string({ required_error: 'Kernel version is missing' })
}).refine((data) => isIsoDate(data.LastBootUpTime), {
	message: 'not valid date'
});

export type CreateSystemInfoInput = TypeOf<typeof createSystemInfoSchema>;
