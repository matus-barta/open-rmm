import { object, string, TypeOf } from 'zod';

//when adding client during installation
export const computerSchema = object({
	body: object({
		UUID: string({ required_error: 'UUID is missing' }).uuid(),
		OneTimeKey: string({ required_error: 'OneTimeKey is missing' })
	})
});

export type ComputerInput = TypeOf<typeof computerSchema>;
