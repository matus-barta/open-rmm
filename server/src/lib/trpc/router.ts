import { t } from '$lib/trpc/t';
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { orgUnits } from '$lib/trpc/routes/orgUnits';
import { computers } from '$lib/trpc/routes/computer';

export const router = t.router({
	orgUnits,
	computers
});

export type Router = typeof router;

// 👇 type helpers 💡
export type RouterInputs = inferRouterInputs<Router>;
export type RouterOutputs = inferRouterOutputs<Router>;
