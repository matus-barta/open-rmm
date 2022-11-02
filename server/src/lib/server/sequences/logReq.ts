import type { Handle } from '@sveltejs/kit';
import log from '$lib/server/utils/logger';

const logReq: Handle = async ({ event, resolve }) => {
	const method = event.request.method;
	const path = event.url.pathname;
	log.info(`⚡: Request: ${method}: ${path}`);

	return resolve(event);
};

export default logReq;
