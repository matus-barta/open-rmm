import { nanoid } from 'nanoid';
import log from './logger';

export const OneTimeKey = () => {
	const otk = nanoid(64); //generate unique one time key
	log.warn(`Generated new OneTimeKey: ${otk}`);
	return otk;
};
