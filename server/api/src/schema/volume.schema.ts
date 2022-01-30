import { number, object, string, TypeOf } from 'zod';

export const createVolumeSchema = object({
	body: object({
		UUID: string({ required_error: 'UUID is missing' }).uuid(),
		UniqueVolumeID: string({ required_error: 'UniqueVolumeID is missing' }),
		VolumeName: string({ required_error: 'VolumeName is missing' }),
		VolumeLetter: string(),
		HealthStatus: string({ required_error: 'HealthStatus is missing' }),
		SizeRemaining: number({ required_error: 'SizeRemaining is missing' }),
		Size: number({ required_error: 'Size is missing' })
	})
});

export type CreateVolumeInput = TypeOf<typeof createVolumeSchema>;
