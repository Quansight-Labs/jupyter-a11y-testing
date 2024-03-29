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
1. Your system must also meet the [Playwright system requirements](https://playwright.dev/docs/troubleshooting#system-requirements)

## Running the accessibility tests ✅

You can run tests locally on your machine, or remotely in the cloud.

> **Note**
> At the time of this writing, we have configured the tests to only run with Chromium,
> but you can [extend these tests to cover other browsers](https://github.com/MarcusFelling/demo.playwright/blob/main/accessibility/playwright.config.ts)
> by modifying the [`playwright.config.ts`](testing/jupyterlab/playwright.config.ts) file.

### Running the tests on GitHub ☁️

> **Tip**
> This is the recommended way to run the tests against JupyterLab.

1. Go to the [JupyterLab accessibility testing
   workflow](https://github.com/Quansight-Labs/jupyter-a11y-testing/actions/workflows/accessibility-test-jupyterlab.yml) on the GitHub Actions UI.

2. Click on the **Run Workflow** button. This should open a dropdown form.
   ![GitHub actions UI - "Run accessibility tests on JupyterLab" workflow with a banner with the text: This workflow has a workflow_dispatch event trigger. And a Run workflow dropdown button.](./../../images/GH-actions-run-workflow-button.png)

3. In the dropdown form, enter the following inputs:

   | Variable            | Description                                                                                                                                                                                                        | Default value           | Required |
   | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------- | -------- |
   | `repository`        | The JupyterLab repository or fork that you want to test in the form of `<organisation or username>/<repository>`.                                                                                                  | `jupyterlab/jupyterlab` | Yes      |
   | `ref`               | A valid reference to check the repository against should be one of:<br>- `branch`: a valid repository branch <br>- `SHA`: for example `4b4b0387febeff95780a3fdb100f4cd6848d29a2` <br>- `tag`: for example `v1.0.0` | `main`[^1]              | Yes      |
   | `test_project`      | The name of the tests to run, should be one of: `""` (runs all tests) or `regression` (runs only the accessibility regression tests)                                                                               | `""`                    | No       |
   | `external_pkg_repo` | A valid repository or fork to link to JupyterLab[^2] in the form of `<organisation or username>/<repository>` for example: `jupyterlab/lumino`                                                                     | `""`                    | No       |
   | `external_pkg_ref`  | A valid reference for the external package or extension defined in Step 4. Should be one of:<br>- `branch`<br>- `tag`<br>- `SHA`                                                                                   | `""`                    | No       |

4. Once you have entered all the information, click on the **Run workflow** button.

[^1]: `main` is the default branch for JupyterLab hence this is the default value for the `ref` parameter.
[^2]: This is useful if you want to test the accessibility of a package that is not part of the JupyterLab repository. See the [Testing Changes to External Pages](https://jupyterlab.readthedocs.io/en/latest/developer/contributing.html#id17) section of JupyterLab's documentation for more information.

#### Inspecting the test results

Once the accessibility tests have been completed you can use the following to inspect the test results:

- **Markdown summary**: scroll to the bottom of the GitHub actions UI, where you can find the workflow run Summary. From here you can use the links to read the manual test scripts for the test cases run.
- **Zipped `json` and `HTML` reports**: these can be downloaded from the GitHub actions UI. The `json` report can be used to generate a custom report using the [Playwright Reporter](https://playwright.dev/docs/test-reporters#custom-reporter). The `HTML` report can be opened in a browser to view the test results.
- [**Annotations**](https://playwright.dev/docs/test-reporters#github-actions-annotations): this will appear directly in the GitHub actions UI.

Follow these steps to download and read the reports locally:

1. Scroll to the bottom of the GitHub actions UI and right-click on the test results' artifact.
2. Unzip the downloaded file. Ideally in a folder where you have `npm` and `playwright` installed. For example, in the `testing/jupyterlab` directory.

   > **Tip**
   > See the instructions in [Running the tests locally](#running-the-tests-locally-) to install the corresponding dependencies.

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

   1. You can [install a pre-built version of JupyterLab](https://jupyterlab.readthedocs.io/en/latest/getting_started/installation.html).
   1. Or you can [build JupyterLab from source](https://jupyterlab.readthedocs.io/en/latest/developer/contributing.html#installing-jupyterlab).
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
