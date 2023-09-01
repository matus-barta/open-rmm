import { PrismaClient } from '@prisma/client'
import { logger } from '$lib/trpc/middleware/logger';
import { t } from '$lib/trpc/t';
import { z } from 'zod';
import log from '$lib/utils/logger';

export const orgUnits = t.router({
	list: t.procedure.use(logger).query(() =>
		PrismaClient.orgUnit.findMany({
			select: {
				OrgUnitName: true,
				OrgUnitTitle: true,
				_count: { select: { Computers: true } }
			}
		})
	),
	add: t.procedure
		.use(logger)
		.input(
			z.object({
				OrgTitle: z
					.string()
					.min(3, 'Min length is 3 characters')
					.refine(
						(data) => {
							return data.toLowerCase() != data;
						},
						{
							message: 'Needs to be Lowercase'
						}
					)
					.refine(
						(data) => {
							return data.indexOf(' ') < 0;
						},
						{
							message: 'No spaces'
						}
					),
				OrgName: z.string().min(3, 'Min length is 3 characters')
			})
		)
		.query(async ({ input }) => {
			try {
				return await prisma.orgUnit.create({
					data: {
						OrgUnitName: input.OrgName,
						OrgUnitTitle: input.OrgTitle
					},
					select: {
						OrgUnitName: true,
						OrgUnitTitle: true
					}
				});
			} catch (e: any) {
				if (e instanceof Prisma.PrismaClientKnownRequestError) {
					// The .code property can be accessed in a type-safe manner
					if (e.code === 'P2002') {
						log.warn('OrgUnit already exists');
						return { message: 'this OrgUnit already exists' };
					}
				}
				return e.message;
			}
		})
});
