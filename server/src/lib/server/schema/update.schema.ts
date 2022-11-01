import { object, string } from 'zod';
import type { TypeOf } from 'zod';

export const createUpdateSchema = object({
	UUID: string({ required_error: 'UUID is missing' }).uuid(),
	Titles: string({ required_error: 'Title is missing' }).array()
});

export type CreateUpdateInput = TypeOf<typeof createUpdateSchema>;
