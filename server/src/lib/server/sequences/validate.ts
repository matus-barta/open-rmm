import type { Handle } from '@sveltejs/kit';

const validate: Handle = async ({ event, resolve }) => {
	try {
		return resolve(event);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (e: any) {
		return new Response(e.errors, { status: 400 });
	}
};

export default validate;
