# LambdaProject — Playwright tests with LambdaTest

This repository contains Playwright tests wired to run against LambdaTest. The project is configured to run in Gitpod for quick PR checks. This README explains how to run tests locally and in Gitpod, how to configure credentials, and troubleshooting tips.

## Quick links
- Playwright tests: `tests/`
- Playwright config: `playwright.config.ts`
- Lambda capabilities: `Config/capabilities.ts`

## Goals
- Run Playwright tests locally.
- Run tests in LambdaTest for cross-browser runs.
- Run PR checks quickly in Gitpod using prebuilds.

## Security (very important)
- Never commit real credentials to source control.
- Use environment variables for LT credentials: `LT_USERNAME` and `LT_ACCESS_KEY`.

## Using Gitpod for PR checks

1. Open the repository in Gitpod (https://gitpod.io/#https://github.com/your-org/your-repo).
2. Configure the repository/workspace secrets in Gitpod (Repository Settings -> Variables):
   - `LT_USERNAME` — your LambdaTest username
   - `LT_ACCESS_KEY` — your LambdaTest access key

The added `.gitpod.yml` will run `npm ci`, install Playwright dependencies and browsers, and then execute `npx playwright test`. Gitpod prebuilds are enabled for `master` and pull requests so tests will run automatically on PRs (subject to your account's prebuild settings).

Important: if credentials are not configured in Gitpod, the workspace will print a warning and tests that require LambdaTest will fail. Use Gitpod's secure variables UI to add them.

## Running tests locally

1. Install dependencies:

```powershell
cd C:\Users\sjaga\OneDrive\Desktop\lambdaproject
npm ci
npx playwright install
```

2. Set environment variables in your shell (PowerShell example):

```powershell
$env:LT_USERNAME = 'your_username'
$env:LT_ACCESS_KEY = 'your_access_key'
npx playwright test
```

Or, use a `.env` file at repository root (already in this repo). DO NOT commit real credentials — add `.env` to `.gitignore`.

## How the Gitpod PR check works

- `.gitpod.yml` performs an `init` step (install) and then runs the Playwright test command.
- GitHub prebuilds run the same init and command when a PR is opened (if prebuilds are enabled for your repo). Prebuilds speed up workspace creation and allow early failures before opening a full workspace.

## Configuring Playwright parallel runs on LambdaTest

- `playwright.config.ts` maps `Config/capabilities.ts` entries to Playwright projects. Each project becomes a separate job and can be executed in parallel by Playwright using workers.
- To increase/decrease parallelism, 
## Troubleshooting

- 400 Bad Request: "The capability browserName has value which is not supported"
  - Ensure `Config/capabilities.ts` uses supported tokens: `chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-webkit`, `pw-firefox`.
  - Make sure `LT_USERNAME` and `LT_ACCESS_KEY` are set in the environment used to run tests.

- Unauthorized errors
  - Verify the exact access key from your LambdaTest dashboard and use it via environment variables.

- Tests fail in Gitpod but pass locally
  - Confirm Gitpod secrets are configured and available to the workspace.
  - Confirm you run tests from repository root so dotenv picks up `.env` (if using .env fallback).



