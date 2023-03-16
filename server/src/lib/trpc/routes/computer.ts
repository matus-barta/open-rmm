import prisma from '$lib/server/db/prisma';
import { logger } from '$lib/trpc/middleware/logger';
import { t } from '$lib/trpc/t';
import { z } from 'zod';

export const computers = t.router({
	list: t.procedure
		.use(logger)
		.input(z.string())
		.query(({ input }) =>
			prisma.computer.findMany({
				where: {
					OrgUnit: input
				},
				select: {
					Id: true,
					Uuid: true,
					CreatedAt: true,
					IsAdded: true,
					IsAllowed: true,
					SystemInfos: {
						select: {
							ComputerName: true,
							PendingReboot: true,
							LastBootupTime: true,
							OsName: true,
							Type: true
						}
					}
				}
			})
		)
});
