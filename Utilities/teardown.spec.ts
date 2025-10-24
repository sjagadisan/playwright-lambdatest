import { Page, Browser } from "@playwright/test";

export const teardown = async (page: Page, browser: Browser): Promise<void> => {
  await page.close();
  await browser.close();
};


