import prisma from '$lib/prisma';
import { logger } from '$lib/trpc/middleware/logger';
import { t } from '$lib/trpc/t';

export const orgUnits = t.router({
	list: t.procedure.use(logger).query(() =>
		prisma.orgUnit.findMany({
			select: {
				OrgUnitName: true,
				_count: { select: { Computers: true } }
			}
		})
	)
});
