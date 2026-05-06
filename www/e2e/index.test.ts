import { expect, test } from '@playwright/test';

test('index page has expected to be have login and register elements', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByText('Please login or register.')).toBeVisible();
	await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();
	await expect(page.getByRole('link', { name: 'Register' })).toBeVisible();
});

test('goto from index to register', async ({ page }) => {
	await page.goto('/');
	await page.getByRole('link', { name: 'Register' }).click();
	await expect(page).toHaveURL('/auth/register');
});
