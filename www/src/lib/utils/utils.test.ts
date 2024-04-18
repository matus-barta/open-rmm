import formatIsoDateTime from './formatDateTime';
import { describe, it, expect } from 'vitest';

describe('formatIsoDateTime', () => {
	it('get correct format with valid DateTime', () => {
		expect(formatIsoDateTime('2024-04-04 20:40:57.629532+00')).toBe('04. Apr. 22:40');
	});
	it('get N/A with empty DateTime', () => {
		expect(formatIsoDateTime('')).toBe('N/A');
	});
	it('get N/A with null DateTime', () => {
		expect(formatIsoDateTime(null)).toBe('N/A');
	});
	it('get N/A with undefined DateTime', () => {
		expect(formatIsoDateTime(undefined)).toBe('N/A');
	});
});
