import { boolean, object, string } from 'zod';
import type { TypeOf } from 'zod';
import isIsoDate from '$lib/utils/isoDate';

//for adding computer to the DB so it can be validated during client installation
export const createComputerSchema = object({
	OrgUnit: string({ required_error: 'OrgUnit is missing' })
});

//now prolly types won't be need
export type CreateComputerInput = TypeOf<typeof createComputerSchema>;

//when adding client during installation
export const updateComputerSchema = object({
	UUID: string({ required_error: 'UUID is missing' }).uuid(),
	OneTimeKey: string({ required_error: 'OneTimeKey is missing' })
});

export type UpdateComputerInput = TypeOf<typeof updateComputerSchema>;

export const readComputerSchema = object({
	Uuid: string({ required_error: 'UUID is missing' }).uuid(),
	IsAdded: boolean({ required_error: 'IsAdded is missing' }),
	IsAllowed: boolean({ required_error: 'IsAllowed is missing' }),
	CreatedAt: string({ required_error: 'CreatedAt is missing' })
}).refine((data) => isIsoDate(data.CreatedAt), { message: 'not valid date' });

export type ReadComputerInput = TypeOf<typeof readComputerSchema>;
