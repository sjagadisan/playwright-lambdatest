import 'dotenv/config';
import { defineConfig, PlaywrightTestConfig } from '@playwright/test';
import { capabilities } from './Config/capabilities';

// ✅ Define BrowserName yourself
type BrowserName = 'chromium' | 'firefox' 

const config: PlaywrightTestConfig = {
  testDir: './tests',
  timeout: 60 * 1000,
  retries: 1,
   reporter: [
    ['list'], // shows results in terminal
    ['html', { outputFolder: 'playwright-report', open: 'never' }] // generates HTML report
  ],
  use: {
    browserName: 'chromium',
    headless: false,
        trace: 'on-first-retry', // optional: capture trace for debugging
    screenshot: 'on',         // take screenshot on every test
    video: 'off',
    viewport: { width: 1280, height: 720 },
    actionTimeout: 10 * 1000,
    ignoreHTTPSErrors: true,
    baseURL: 'https://www.lambdatest.com/selenium-playground/',
  },
  projects: capabilities.map((capability) => ({
    name: capability['LT:Options'].name,
    use: {
      browserName: capability.browserName as BrowserName,
      headless: false,
      viewport: { width: 1280, height: 720 },
      baseURL: 'https://www.lambdatest.com',
      ltOptions: {
        user: capability['LT:Options'].user,
        accessKey: capability['LT:Options'].accessKey,
        platform: capability['LT:Options'].platform,
        build: capability['LT:Options'].build,
        name: capability['LT:Options'].name,
        network: capability['LT:Options'].network,
        video: capability['LT:Options'].video,
        console: capability['LT:Options'].console,
      },
    },
  })),
};

export default defineConfig(config);
