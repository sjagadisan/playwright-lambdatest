import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load .env from project root (works even if tests run from the `tests/` folder)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
dotenv.config({ path: path.join(projectRoot, '.env') });

const LT_USER = process.env.LT_USERNAME || process.env.LT_USER || '';
const LT_KEY = process.env.LT_ACCESS_KEY || process.env.LT_ACCESSKEY || process.env.LT_KEY || '';

if (!LT_USER || !LT_KEY) {
  // Do not throw here to keep test runner from crashing early; we'll let connectToBrowser give a clearer message.
  // But log a helpful reminder so it's visible when running locally.
  // Remove or silence this log in CI where secrets shouldn't be displayed.
  // Masked logging:
  const mask = (s: string) => (s ? `${s.slice(0, 3)}...${s.slice(-3)}` : 'undefined');
  // eslint-disable-next-line no-console
  console.warn('Config/capabilities: LT credentials not found in env. user=', mask(LT_USER), ' accessKey=', LT_KEY ? '***' : 'undefined');
}

export const capabilities = [
  {
    browserName: "pw-chromium",
    browserVersion: "latest",
      fullyParallel: true, //Enables parallel execution

    "LT:Options": {
      platform: "Windows 10",
      build: "Playwright Build",
      name: "Playwright Test Chrome",
     user: LT_USER,
    accessKey:LT_KEY,
      network: true,
      video: true,
      console: true,
    },
  },
  {
    browserName: "pw-firefox",
    browserVersion: "137.0",
    "LT:Options": {
      platform: "macOS Catalina",
      build: "Playwright Build",
      name: "Playwright Test Firefox",
     user: LT_USER,
accessKey: LT_KEY,
      network: true,
      video: true,
      console: true,
    },
  },
];
