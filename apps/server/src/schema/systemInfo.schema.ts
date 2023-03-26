import { boolean, date, object, string, TypeOf } from 'zod';
import isIsoDate from '../utils/isoDate';

export const systemInfoSchema = object({
	body: object({
		UUID: string({ required_error: 'UUID is missing' }).uuid(),
		PendingReboot: boolean(),
		ComputerName: string({ required_error: 'Computer name is missing' }),
		LastBootUpTime: string({ required_error: 'DateTime is missing' }),
		OsVersion: string({ required_error: 'OS version is missing' }),
		OsName: string({ required_error: 'OS name is missing' }),
		KernelVersion: string({ required_error: 'Kernel version is missing' }),
		Type: string({ required_error: 'Type is missing' })
	})
		.refine((data) => isIsoDate(data.LastBootUpTime), {
			message: 'not valid date'
		})
		.refine(
			(data) => {
				data.Type == 'physical' || data.Type == 'vm' || data.Type == 'container';
			},
			{
				message: 'invalid type'
			}
		)
});

export type SystemInfoInput = TypeOf<typeof systemInfoSchema>;
