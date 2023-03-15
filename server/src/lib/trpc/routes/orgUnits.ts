import prisma from '$lib/server/db/prisma';
import { logger } from '$lib/trpc/middleware/logger';
import { t } from '$lib/trpc/t';
import { z } from 'zod';

export const orgUnits = t.router({
	list: t.procedure.use(logger).query(() =>
		prisma.orgUnit.findMany({
			select: {
				OrgUnitName: true
			}
		})
	)
});
