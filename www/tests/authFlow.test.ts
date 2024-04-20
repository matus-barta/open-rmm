import { expect, test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { defaultRoute } from '$lib/config';

const userData = {
	fullName: faker.person.fullName(),
	email: faker.internet.email(),
	password: faker.internet.password(),
	companyName: faker.company.name()
};

test('register user and show email on index page', async ({ page }) => {
	await page.goto('/auth/register');
	await page.getByLabel('Full Name').fill(userData.fullName);
	await page.getByLabel('Email').fill(userData.email);
	await page.getByLabel('Password').fill(userData.password);
	await page.getByLabel('Tenant name').fill(userData.companyName);
	await page.getByRole('button', { name: 'Register' }).click();
	await expect(page).toHaveURL(defaultRoute);
	await page.goto('/');
	await expect(page.getByText(`Welcome back ${userData.email}!`)).toBeVisible();
});

test('login user', async ({ page }) => {
	await page.goto('/auth/login');
	await page.getByLabel('Email').fill(userData.email);
	await page.getByLabel('Password').fill(userData.password);
	await page.getByRole('button', { name: 'Login' }).click();
	await expect(page).toHaveURL(defaultRoute);
	await page.goto('/');
	await expect(page.getByText(`Welcome back ${userData.email}!`)).toBeVisible();
});

test('logout user', async ({ page }) => {
	await page.goto('/auth/login');
	await page.getByLabel('Email').fill(userData.email);
	await page.getByLabel('Password').fill(userData.password);
	await page.getByRole('button', { name: 'Login' }).click();
	await expect(page).toHaveURL(defaultRoute);

	await page.goto('/');
	await page.getByRole('button', { name: 'Logout' }).click();

	await expect(page).toHaveURL('/');
	await expect(page.getByText('Please login or register.')).toBeVisible();
});

test('check company name on /dashboard', async ({ page }) => {
	await page.goto('/auth/login');
	await page.getByLabel('Email').fill(userData.email);
	await page.getByLabel('Password').fill(userData.password);
	await page.getByRole('button', { name: 'Login' }).click();

	await page.waitForLoadState();
	await expect(page).toHaveURL(defaultRoute);
	await expect(page).toHaveTitle('Open RMM - Dashboard');

	await expect(page.getByText(userData.companyName)).toBeVisible();
	await expect(page.getByText(userData.fullName)).toBeVisible();
});
