import prisma from '$lib/server/db/prisma';
import { logger } from '$lib/trpc/middleware/logger';
import { t } from '$lib/trpc/t';
import { z } from 'zod';

export const orgUnits = t.router({
	list: t.procedure
		.use(logger)
		.input(z.string().optional())
		.query(({ input }) =>
			prisma.orgUnit.findMany({
				select: {
					Id: true,
					OrgUnitName: true
				},
				where: input ? { Id: Number.parseInt(input) } : undefined
			})
		)
});
