import type { Actions } from './$types';
import { createComputerHandler } from '$lib/server/controller/computer.controller';
import type { CreateComputerInput } from '$lib/schema/computer.schema';

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const orgUnit = data.get('OrgUnit');

		createComputerHandler({ OrgUnit: orgUnit } as CreateComputerInput);
	}
};
