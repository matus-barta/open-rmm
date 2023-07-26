import { boolean, date, object, string, TypeOf } from 'zod';
import isIsoDate from '../utils/isoDate';

export const systemInfoSchema = object({
	body: object({
		UUID: string({ required_error: 'UUID is missing' }).uuid(),
		PendingReboot: string({ required_error: 'Pending reboot is missing' }),
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
				return data.Type == 'Physical' || data.Type == 'VM' || data.Type == 'LXC';
			},
			{
				message: 'invalid system type'
			}
		)
		.refine(
			(data) => {
				return (
					data.PendingReboot.toLowerCase() == 'true' || data.PendingReboot.toLowerCase() == 'false'
				);
			},
			{
				message: 'reboot pending has to contain boolean value'
			}
		)
});

export type SystemInfoInput = TypeOf<typeof systemInfoSchema>;
