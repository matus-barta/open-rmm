import { object, string } from 'zod';
import type { TypeOf } from 'zod';

export const createOrgUnitSchema = object({
	OrgUnitName: string({ required_error: 'OrgUnit is missing' })
});

export type CreateOrgUnitInput = TypeOf<typeof createOrgUnitSchema>;
