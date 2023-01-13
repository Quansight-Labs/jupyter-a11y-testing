# JupyterLab's accessibility tests

- [JupyterLab's accessibility tests](#jupyterlabs-accessibility-tests)
  - [Requirements 📦](#requirements-)
  - [Running the accessibility tests ✅](#running-the-accessibility-tests-)
    - [Running the tests on GitHub ☁️](#running-the-tests-on-github-️)
      - [Inspecting the test results](#inspecting-the-test-results)
    - [Running the tests locally 💻](#running-the-tests-locally-)
  - [Troubleshooting 🔍](#troubleshooting-)

## Requirements 📦

To run the tests in this directory you need the following prerequisites:

1. Python >= 3.9
1. [mamba](https://github.com/mamba-org/mamba) (or [conda](https://docs.conda.io/projects/conda/en/latest/commands/install.html))
1. Your system must also meet the [Playwright system requirements](https://playwright.dev/docs/library#system-requirements)

## Running the accessibility tests ✅

You can run tests locally on your machine, or remotely in the cloud.

> **Note**
> At the time of this writing, we have configured the tests to only run with Chromium,
> but you can [extend these tests to cover other browsers](https://github.com/MarcusFelling/demo.playwright/blob/main/accessibility/playwright.config.ts)
> by modifying the [`playwright.config.ts`](testing/jupyterlab/playwright.config.ts) file.

### Running the tests on GitHub ☁️

1. Go to the [JupyterLab accessibility testing
   workflow](https://github.com/Quansight-Labs/jupyter-a11y-testing/actions/workflows/accessibility-test-jupyterlab.yml).

   > **Note:** this link will redirect you to the GitHub Actions UI.

2. Click the "Run Workflow" button. This should open a dropdown form.

3. In the dropdown form, enter:

   1. The JupyterLab repo or fork that you want to test
   2. The SHA of the commit in the JupyterLab repo that you want to test
   3. (optional) The subset of tests that you want to run (e.g., enter `regression` to run only the accessibility regression tests).

#### Inspecting the test results

Once the accessibility tests have been completed you can use the following to inspect the test results:

- [Annotations](https://playwright.dev/docs/test-reporters#github-actions-annotations): this will appear directly in the GitHub actions UI.
- Markdown summary: scroll to the bottom of the GitHub actions UI, where you can find this summary. From here you can use the links to read the manual test scripts for the corresponding tests.
- Zipped `json` and `HTML` reports: these can be downloaded from the GitHub actions UI. The `json` report can be used to generate a custom report using the [Playwright Reporter](https://playwright.dev/docs/test-reporters#custom-reporter). The `HTML` report can be opened in a browser to view the test results.

Follow these steps to download and read the reports locally:

1. Scroll to the bottom of the GitHub actions UI and right-click on the test results' artifact.
2. Unzip the downloaded file. Ideally in a folder where you have `npm` and `playwright` installed. For example, in the `testing/jupyterlab` directory.
3. Using the command line, change to the directory where you unzipped the test results.
4. Use the following command to open the `HTML` report in your browser:

   ```bash
   npx playwright show-report <name-of-my-extracted-playwright-report>
   ```

   This will serve up the report in your web browser.

### Running the tests locally 💻

1. Make sure you are in the correct directory - the one containing the `playwright.config.ts` file:

   ```bash
   cd testing/jupyterlab
   ```

1. Install Node.js and the needed Python dependencies:

   ```bash
   # if using conda
   conda env create -f environment.yml

   # if using mamba
   mamba env create -f environment.yml
   ```

1. Activate the new `conda` environment:

   ```bash
   conda activate a11y-tests
   ```

1. Install JupyterLab version 3 or 4. There are several ways to do this.
   You can [install a pre-built version of JupyterLab](https://jupyterlab.readthedocs.io/en/latest/getting_started/installation.html).
   Or you can [build JupyterLab from source](https://jupyterlab.readthedocs.io/en/latest/developer/contributing.html#installing-jupyterlab).
   When you've finished, you should be able to run `jupyter lab --version` from the command line.

1. Install the Node.js dependencies (`package.json`):

   ```bash
   npm install
   ```

1. Install the browsers needed by Playwright:

   ```bash
   npx playwright install
   ```

   > **Note**
   > If your system doesn't already have some dependencies that the browsers
   > expect, you may need to install the system dependencies first. This step
   > probably isn't necessary if you're working on a machine that already has
   > Chrome or other browsers on it: `npx playwright install-deps`.
   > Visit [Playwright docs - Command line tools](https://playwright.dev/docs/cli) for
   > more info.

1. Run the tests:

   ```bash
   npm test
   ```

   > **Note** If you only want to run the regression tests: `npm test -- --project=regression`

Your console should output a local URL that you can open in your browser to see
the test results: typically <http://127.0.0.1:9323>

## Troubleshooting 🔍

If a test fails, Playwright should attach a video and possibly other files to
that test, which could help debug or explain why the test failed.
