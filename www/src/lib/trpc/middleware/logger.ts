import { t } from '$lib/trpc/t';
import log from '$lib/utils/logger';

export const logger = t.middleware(async ({ path, type, next }) => {
	const start = Date.now();
	const result = await next();
	const ms = Date.now() - start;
	result.ok
		? log.info(`OK: ${type} - ${path} - ${ms}ms`)
		: log.error(`ERR: ${type} - ${path} - ${ms}ms`);
	return result;
});
