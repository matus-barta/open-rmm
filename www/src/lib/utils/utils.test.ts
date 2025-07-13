import formatIsoDateTime from './formatDateTime';
import { describe, it, expect } from 'vitest';
import { OneTimeKey } from './generators';
import { getInitials } from './userName';

describe('formatIsoDateTime', () => {
	it('get correct format with valid DateTime', () => {
		expect(formatIsoDateTime('2024-04-04 20:40:57.629532+00')).toBe('04. Apr. 20:40');
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

describe('OneTimeKey', () => {
	it('get 64 characters', () => {
		expect(OneTimeKey()).toHaveLength(64);
	});
	it('call twice, to not equal', () => {
		expect(OneTimeKey()).not.equal(OneTimeKey);
	});
});

describe('Get correct initials', () => {
	it('Firstname and Lastname', () => {
		expect(getInitials('Janko Hrasko')).toBe('JH');
	});
	it('Firstname and Lastname but it input is lowercase', () => {
		expect(getInitials('janko hrasko')).toBe('JH');
	});
	it('Only one name', () => {
		expect(getInitials('Adele')).toBe('A');
	});
	it('Firstname, Middlename,  Lastname', () => {
		expect(getInitials('Jay Jonah Jameson')).toBe('JJJ');
	});
	it('null input', () => {
		expect(getInitials(null)).toBe('');
	});
});
