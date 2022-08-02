# JupyterLab's accessibility tests

- [JupyterLab's accessibility tests](#jupyterlabs-accessibility-tests)
  - [📦 Requirements](#-requirements)
  - [✅ Running the accessibility tests](#-running-the-accessibility-tests)
    - [💻 Locally](#-locally)
    - [☁️ Running in Gitpod](#️-running-in-gitpod)
  - [🔍 Troubleshooting](#-troubleshooting)

## 📦 Requirements

To run the tests in this directory you need the following prerequisites:

- [mamba](https://github.com/mamba-org/mamba) (or [conda](https://docs.conda.io/projects/conda/en/latest/commands/install.html))
- Your system must also meet the [Playwright system requirements](https://playwright.dev/docs/library#system-requirements)

## ✅ Running the accessibility tests

You can run tests locally on your machine, or remotely in the cloud.

At the time of this writing, we have configured the tests to only run with
Chromium, but you can
[extend these tests to cover other browsers](https://github.com/MarcusFelling/demo.playwright/blob/main/accessibility/playwright.config.ts)
by modifying the [`playwright.config.ts`](testing/jupyterlab/playwright.config.ts) file.

### 💻 Running the tests locally

1. Make sure you are in the correct directory - the one containing the `playwright.config.ts` file.:

   ```bash
   cd testing/jupyterlab
   ```

2. Install the Python dependencies:

   ```bash
   # if using conda
   conda env create -f environment.yml

   # if using mamba
   mamba env create -f environment.yml
   ```

3. Install the Node.js dependencies:

   ```bash
   yarn install
   npx playwright install
   ```

4. Run the tests:

   ```bash
   yarn test
   ```

Your console should output a local URL that you can open in your browser to see
the test results: typically <http://127.0.0.1:9323>

### ☁️ Running the tests in Gitpod

As an alternative to running the tests locally on your own machine, you can run
them in a cloud environment on Gitpod.

[![Open in Gitpod button](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/jupyter/accessibility)

Once you are in the Gitpod workspace, you can run the tests from the command line:

```bash
yarn test
```

The Gitpod console should output a local URL that you can open in your browser
to see the test results: typically <http://127.0.0.1:9323>

In case you're wondering how you can open a local URL from a cloud environment,
Gitpod opens a remote session in VS Code (or other supported editor) and sets it
up to proxy the local URL to its remote server address.

> **Warning**
> Currently our Gitpod setup does not allow you to debug playwright tests by opening additional browser tabs.

## 🔍 Troubleshooting

If a test fails, Playwright should attach a video and possibly other files to
that test, which could help debug or explain why the test failed.
