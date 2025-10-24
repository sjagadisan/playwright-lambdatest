import { chromium } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

(async () => {
  const capabilities = {
    browserName: 'chromium',
    browserVersion: 'latest',
    platform: 'Windows 10',
    'LT:Options': {
      username: process.env.LT_USERNAME,
      accessKey: process.env.LT_ACCESS_KEY,
    },
  };

  const wsEndpoint = `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`;

  console.log('Trying to connect with URL:\n', wsEndpoint);

  try {
    const browser = await chromium.connect({ wsEndpoint });
    console.log('Connected successfully!');
    await browser.close();
  } catch (err) {
    console.error('Connection failed:', err.message);
  }
})();