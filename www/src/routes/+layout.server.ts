import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { safeGetSession } }) => {
	console.log('Ran server layout load');
	const { session, user } = await safeGetSession();

	return {
		session,
		user
	};
};
