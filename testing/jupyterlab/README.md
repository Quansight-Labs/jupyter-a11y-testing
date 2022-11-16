# JupyterLab's accessibility tests

- [JupyterLab's accessibility tests](#jupyterlabs-accessibility-tests)
  - [Requirements 📦](#requirements-)
  - [Running the accessibility tests ✅](#running-the-accessibility-tests-)
    - [Running the tests on GitHub ☁️](#running-the-tests-on-github-️)
    - [Running the tests locally 💻](#running-the-tests-locally-)
  - [Troubleshooting 🔍](#troubleshooting-)

## Requirements 📦

To run the tests in this directory you need the following prerequisites:

1. Python >= 3.7
1. [mamba](https://github.com/mamba-org/mamba) (or [conda](https://docs.conda.io/projects/conda/en/latest/commands/install.html))
1. Your system must also meet the [Playwright system requirements](https://playwright.dev/docs/library#system-requirements)

## Running the accessibility tests ✅

You can run tests locally on your machine, or remotely in the cloud.

At the time of this writing, we have configured the tests to only run with Chromium, but you can
[extend these tests to cover other browsers](https://github.com/MarcusFelling/demo.playwright/blob/main/accessibility/playwright.config.ts)
by modifying the [`playwright.config.ts`](testing/jupyterlab/playwright.config.ts) file.

### Running the tests on GitHub ☁️

1. Go to the [JupyterLab accessibility testing
   workflow](https://github.com/Quansight-Labs/jupyter-a11y-testing/actions/workflows/accessibility-test-jupyterlab.yml).

2. Click the "Run Workflow" button. This should open a dropdown form.

3. In the dropdown form, enter:

   1. the JupyterLab repo or fork that you want to test
   2. the SHA of the commit in the JupyterLab repo that you want to test
   3. (optional) the subset of tests that you want to run (e.g., enter `regression` to run only the accessibility regression tests).

### Running the tests locally 💻

1. Make sure you are in the correct directory - the one containing the `playwright.config.ts` file:

   ```bash
   cd testing/jupyterlab
   ```

2. Install Node.js and the needed Python dependencies:

   ```bash
   # if using conda
   conda env create -f environment.yml

   # if using mamba
   mamba env create -f environment.yml
   ```

3. Activate the new conda environment:

   ```bash
   conda activate a11y-tests
   ```

4. Install JupyterLab version 3 or 4. There are several ways to do this. You can
   [install a pre-built version of
   JupyterLab](https://jupyterlab.readthedocs.io/en/latest/getting_started/installation.html).
   Or you can [build JupyterLab from
   source](https://jupyterlab.readthedocs.io/en/latest/developer/contributing.html#installing-jupyterlab).
   When you've finished, you should be able to run `jupyter lab --version` from
   the command line.

5. Install the Node.js dependencies (`package.json`):

   ```bash
   npm install
   ```

6. Install browsers needed by Playwright:

   ```bash
   npx playwright install
   ```

   > **Note**
   > If your system doesn't already have some dependencies that the browsers
   > expect, you may need to install the system dependencies first. This step
   > probably isn't necessary if you're working on a machine that already has
   > Chrome or other browsers on it: `npx playwright install-deps`. Visit
   > [Playwright docs - Command line tools](https://playwright.dev/docs/cli) for
   > more info.

7. Run the tests:

   ```bash
   npm test
   ```

   > **Note** If you only want to run the regression tests: `npm test -- --project=regression`

Your console should output a local URL that you can open in your browser to see
the test results: typically <http://127.0.0.1:9323>

## Troubleshooting 🔍

If a test fails, Playwright should attach a video and possibly other files to
that test, which could help debug or explain why the test failed.
