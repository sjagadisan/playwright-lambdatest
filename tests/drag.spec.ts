import { test, expect } from "@playwright/test";
import draganddrop  from "..//Pages/draganddrop.spec.ts";



test('test', async ({ page }) => {
  await page.goto('https://www.lambdatest.com/selenium-playground/');
  await page.getByRole('link', { name: 'Drag & Drop Sliders' }).click();
  await page.locator('#slider3').getByRole('slider').fill('15');
  await expect(page.locator('#slider3').getByRole('slider')).toHaveValue('15');
  await page.locator('#slider3').getByRole('slider').fill('95');
  await page.getByText('95').click();

});