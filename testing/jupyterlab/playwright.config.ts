// Copyright (c) Jupyter Accessibility Development Team.
// Distributed under the terms of the Modified BSD License.

// playwright.config.ts
import galataConfig from "@jupyterlab/galata/lib/playwright-config";
import { PlaywrightTestConfig, devices } from "@playwright/test";
import { expect } from "@playwright/test";
import matchers from "expect-axe-playwright";

expect.extend(matchers);

/**
 * Modified from https://github.com/MarcusFelling/demo.playwright/blob/main/accessibility/playwright.config.ts
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig & { manualTestingScriptsBaseURL: string } = {
  ...galataConfig,

  testDir: "./tests",

  /* Maximum time one test can run for. */
  timeout: 60 * 1000,

  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 5000,
  },

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,

  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    [process.env.CI ? "github" : "list"],
    [
      "./markdown-reporter.ts",
      {
        outputFile: "test-results/jupyterlab-a11y-regression-test-results.md",
        // The URL to the directory of manual testing scripts
        manualTestingScriptsBaseURL: process.env.CI
          ? // If we always use the main branch URL as the base URL for the manual
            // testing scripts, then when we use the markdown reporter during a
            // workflow run against a PR, all the links to any manual testing
            // scripts added or edited by the PR would be dead links (404). But if
            // we construct the URL using the GitHub environment variables, we can
            // output links that work.
            `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/blob/${process.env.GITHUB_SHA}/testing/jupyterlab/manual-testing-scripts`
          : "https://github.com/Quansight-Labs/jupyter-a11y-testing/blob/main/testing/jupyterlab/manual-testing-scripts",
      },
    ],
    [
      "json",
      {
        outputFile: "test-results/jupyterlab-a11y-regression-test-results.json",
      },
    ],
    ["html", { open: process.env.CI ? "never" : "on-failure" }],
  ],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,

    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: process.env.BASEURL,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on",

    acceptDownloads: true,

    video: "retain-on-failure",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",

      /* Project-specific settings. */
      use: {
        ...devices["Desktop Chrome"],
      },
    },
    {
      name: "regression",
      testDir: "./tests/regression-tests",
    },
  ],

  /* Run a server. The tests will open urls to this server in the browser. */
  webServer: {
    command: "npm start",
    port: 8888,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
};

export default config;
