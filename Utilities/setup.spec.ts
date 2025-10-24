import { chromium } from "playwright";

export const connectToBrowser = async (capabilities: any) => {
  // prefer env vars and trim whitespace
  const envUser = (process.env.LT_USERNAME || process.env.LT_USER || "").trim();
  const envKey = (process.env.LT_ACCESS_KEY || process.env.LT_ACCESSKEY || process.env.LT_KEY || "").trim();

  capabilities = capabilities || {};
  capabilities['LT:Options'] = capabilities['LT:Options'] || {};

  // If env vars exist, overwrite capability values so you are sure what is sent
  if (envUser) capabilities['LT:Options'].user = envUser;
  if (envKey) capabilities['LT:Options'].accessKey = envKey;

  // ensure trimmed values (in case they came from file)
  if (capabilities['LT:Options'].user) capabilities['LT:Options'].user = String(capabilities['LT:Options'].user).trim();
  if (capabilities['LT:Options'].accessKey) capabilities['LT:Options'].accessKey = String(capabilities['LT:Options'].accessKey).trim();

  const user = capabilities['LT:Options'].user;
  const key = capabilities['LT:Options'].accessKey;

  const mask = (s?: string) => (s ? `${s.slice(0, 3)}...${s.slice(-3)}` : "undefined");
  console.log("connectToBrowser: user=", mask(user), "accessKey=", key ? "***" : "undefined");

  if (!user || !key) {
    throw new Error(
      'LambdaTest credentials missing or empty. Set LT_USERNAME and LT_ACCESS_KEY env vars or include them in capabilities["LT:Options"].'
    );
  }

  const ws = `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`;
  console.log("connectToBrowser: ws prefix:", ws.slice(0, 80));

  try {
    const browser = await chromium.connect({ wsEndpoint: ws });
    return browser;
  } catch (err: any) {
    console.error("connectToBrowser error:", err?.message || err);
    if (err?.message && /Unauthorized|invalid/i.test(err.message)) {
      console.error("Unauthorized: verify LT_USERNAME and LT_ACCESS_KEY, and ensure the access key is valid for user:", mask(user));
    }
    throw err;
  }
};
