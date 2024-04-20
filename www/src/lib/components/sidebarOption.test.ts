/* eslint-disable @typescript-eslint/no-unused-vars */
import { faker } from '@faker-js/faker';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import '@testing-library/jest-dom';

import SidebarOption from './SidebarOption.svelte';

describe('test SideBarOption component', () => {
	it('renders with correct title', () => {
		//TODO: resolve testing of components when using stores
		/*const { getByText } = render(SidebarOption, {
			title: 'test',
			uuid: faker.string.uuid(),
			path: '/something',
			icon: 99,
			color: null,
			count: new Promise<number>(() => {
				return 1;
			})
		});

		expect(getByText('test')).toBeInTheDocument();*/
	});
});
