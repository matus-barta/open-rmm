import { OneTimeKey } from '../generators';
import { describe, it, expect } from 'vitest';

describe('OneTimeKey', () => {
	it('get 64 characters', () => {
		expect(OneTimeKey()).toHaveLength(64);
	});
	it('call twice, to not equal', () => {
		expect(OneTimeKey()).not.equal(OneTimeKey);
	});
});