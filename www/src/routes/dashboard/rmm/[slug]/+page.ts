import { trpc } from '$lib/trpc/client';
import type { PageLoad } from './$types';

export const load: PageLoad = (event) => ({
	computers: trpc(event).computers.list.query(event.params.slug)
});
