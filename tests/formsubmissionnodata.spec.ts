import { expect } from '@playwright/test';
import {test} from "@playwright/test";
import { formdemo } from '../Pages/formdemo.spec';

test ("Submit without entering anything", async ({page,baseURL}) =>
{
const form = new formdemo(page);
await page.goto(`${baseURL}input-form-demo`);
await form.submit();
const nameInput= await page.getByRole('textbox', { name: 'Name' })
const isMissing = await nameInput.evaluate((el: HTMLInputElement) => el.validity.valueMissing);
expect(isMissing).toBeTruthy();
});
