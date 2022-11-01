import { object, string } from 'zod';
import type { TypeOf } from 'zod';

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
