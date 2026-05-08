import { z } from 'zod';
import { btnColors, btnIcons } from '$lib/iconsList';

export const formOrgUnit = z.object({
	name: z.string().min(3).max(25),
	color: z
		.number()
		.int()
		.min(0)
		.max(btnColors.length - 1),
	icon: z
		.number()
		.int()
		.min(0)
		.max(btnIcons.length - 1)
});

export type FormOrgUnitSchema = typeof formOrgUnit;
