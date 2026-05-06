import { z } from 'zod';

export const formOrgUnit = z.object({
	name: z.string().min(3).max(25)
});

export type FormOrgUnitSchema = typeof formOrgUnit;
