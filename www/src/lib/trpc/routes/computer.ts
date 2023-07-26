import { prisma } from 'database';
import { logger } from '$lib/trpc/middleware/logger';
import { t } from '$lib/trpc/t';
import { z } from 'zod';
import { nanoid } from 'nanoid';
import log from '$lib/utils/logger';

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
					SystemInfo: {
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
		),
	createOtk: t.procedure
		.use(logger)
		.input(
			z.object({
				OrgUnit: z.string(),
				IsAllowed: z.boolean().optional()
			})
		)
		.query(({ input }) =>
			prisma.computer.create({
				data: {
					OneTimeKey: generateOtk(),
					OrgUnit: input.OrgUnit,
					IsAllowed: input.IsAllowed
				},
				select: {
					OneTimeKey: true
				}
			})
		)
});

function generateOtk() {
	const OneTimeKey = nanoid(64); //generate unique one time key
	log.warn(` ⚠ : Generated new OneTimeKey: ${OneTimeKey}`);

	return OneTimeKey;
}
