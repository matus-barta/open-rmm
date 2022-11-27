import { number, object, string } from 'zod';
import type { TypeOf } from 'zod';

export const createOrgUnitSchema = object({
	OrgUnitName: string({ required_error: 'OrgUnit is missing' })
});

export type CreateOrgUnitInput = TypeOf<typeof createOrgUnitSchema>;

export const readOrgUnitSchema = object({
	Id: number({ required_error: 'Id is missing' }),
	OrgUnitName: string({ required_error: 'OrgUnit is missing' })
});

export type ReadOrgUnitInput = TypeOf<typeof readOrgUnitSchema>;
