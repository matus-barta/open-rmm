import { fail } from '@sveltejs/kit';
import { createContext } from '$lib/trpc/context';
import { router } from '$lib/trpc/router';

export const actions = {
	create: async (event) => {
		const data = await event.request.formData();

		try {
			const err: { message: string } = await router
				.createCaller(await createContext(event))
				.orgUnits.add({
					OrgName: data.get('OrgUnitName') as string,
					OrgTitle: data.get('OrgUnitTitle') as string
				});

			console.log(JSON.stringify(err));

			if (err.message != '') throw new Error(err.message);
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			return fail(422, {
				OrgUnitName: data.get('OrgUnitName'),
				OrgUnitTitle: data.get('OrgUnitTitle'),
				error: error.message
			});
		}
	}
};
