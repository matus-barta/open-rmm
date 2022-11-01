import type { Handle } from '@sveltejs/kit';

const checkAuthUuid: Handle = async ({ event, resolve }) => {
	return resolve(event);
};

export default checkAuthUuid;
