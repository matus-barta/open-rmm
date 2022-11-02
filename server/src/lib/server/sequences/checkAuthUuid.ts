import type { Handle } from '@sveltejs/kit';
import log from '../utils/logger';

const checkAuthUuid: Handle = async ({ event, resolve }) => {
	log.info('auth');
	return resolve(event);
};

export default checkAuthUuid;
