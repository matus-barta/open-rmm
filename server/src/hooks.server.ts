import { sequence } from '@sveltejs/kit/hooks';
import log from '$lib/server/sequences/logReq';
import auth from '$lib/server/sequences/checkAuthUuid';
import validation from '$lib/server/sequences/validate';

export const handle = sequence(log, auth, validation);
