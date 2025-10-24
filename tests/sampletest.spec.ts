import { chromium, Browser, Page, ElementHandle, expect } from '@playwright/test';

(async () => {
  // Define LambdaTest capabilities
  const capabilities = {
    browserName: 'Chrome', // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
    browserVersion: 'latest',
    'LT:Options': {
      platform: 'Windows 10',
      build: 'Playwright Sample Build',
      name: 'Playwright Sample Test',
      user: "sjagadisan",
      accessKey: "LT_LhhZn9Ncj1Mz7opp3Fqjq16BYbKsi4MJbfY2M0iwcM6svfP",
      network: true,
      video: true,
      console: true
    }
  };

  // Connect to LambdaTest browser
  const browser: Browser = await chromium.connect({
    wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`
  });

  const page: Page = await browser.newPage();

  // Navigate to Bing
  await page.goto('https://www.bing.com');

const element = await page.$('[aria-label="Enter your search term"]');
  if (!element) {
    throw new Error('Search input not found');
  }

  await element.click();
  await element.fill('LambdaTest');
  await element.press('Enter');

  const title: string = await page.title();

  // Helper function to set LambdaTest status
  const setLambdaTestStatus = async (page: Page, status: 'passed' | 'failed', remark: string) => {
    await page.evaluate((command) => {
      // @ts-ignore
      window.__lt_action = command; // LambdaTest reads this in browser context
    }, {
      action: 'setTestStatus',
      arguments: { status, remark }
    });
  };

  // Validate title and set test status
  try {
    expect(title).toEqual('LambdaTest - Search');
    await setLambdaTestStatus(page, 'passed', 'Title matched');
  } catch {
    await setLambdaTestStatus(page, 'failed', 'Title not matched');
  }

  await browser.close();
})();
