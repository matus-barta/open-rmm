import { object, string } from 'zod';
import type { TypeOf } from 'zod';

export const createAntivirusSchema = object({
	UUID: string({ required_error: 'UUID is missing' }).uuid(),
	AVName: string({ required_error: 'AVName is missing' }),
	UpdateStatus: string({ required_error: 'UpdateStatus is missing' }),
	ProtectionStatus: string({ required_error: 'ProtectionStatus is missing' })
});

export type CreateAntivirusInput = TypeOf<typeof createAntivirusSchema>;
