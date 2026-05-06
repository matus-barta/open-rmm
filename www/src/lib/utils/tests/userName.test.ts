import { describe, it, expect } from 'vitest';
import { getInitials } from '../userName';

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
	it('Firstname, Middlename, Lastname', () => {
		expect(getInitials('Jay Jonah Jameson')).toBe('JJJ');
	});
	it('null input', () => {
		expect(getInitials(null)).toBe('');
	});
});