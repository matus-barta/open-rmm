import { object, string, TypeOf } from 'zod';

export const createUpdateSchema = object({
	body: object({
		UUID: string({ required_error: 'UUID is missing' }).uuid(),
		Titles: string({ required_error: 'Title is missing' }).array()
	})
});

export type CreateUpdateInput = TypeOf<typeof createUpdateSchema>;
