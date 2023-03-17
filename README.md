<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/jupyter/accessibility/main/docs/_static/logos/JupAccessLight.svg">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/jupyter/accessibility/main/docs/_static/logos/JupAccessColor.svg">
  <img alt="Jupyter accessibility logo in grey and orange colours for light mode, all white logo in dark mode" src="https://raw.githubusercontent.com/jupyter/accessibility/main/docs/_static/logos/JupAccessColor.svg">
</picture>

# Jupyter accessibility testing tools

<!-- prettier-ignore-start -->
<!-- ignoring because prettier by default adds loads of spaces -->
Information | Links
---------|----------
 Project | [![OSI License badge - BSD-3](https://img.shields.io/badge/License-BSD%203--Clause%20📃-gray.svg?colorA=2D2A56&colorB=5936D9&style=flat.svg)](https://opensource.org/licenses/BSD-3-Clause) [![Project backlog badge](https://img.shields.io/badge/Backlog-GitHub%20Board%20🗃️-gray.svg?colorA=2D2A56&colorB=A7B2F2&style=flat.svg)](https://github.com/orgs/Quansight-Labs/projects/8/views/1)
<!-- prettier-ignore-end -->

- [Jupyter accessibility testing tools](#jupyter-accessibility-testing-tools)
  - [Plans for the future 🚀](#plans-for-the-future-)
  - [Repository orientation 🗺️](#repository-orientation-️)
  - [Pre-commit hooks 🧹](#pre-commit-hooks-)
  - [License 📖](#license-)

Welcome to the Jupyter Accessibility testing tool's repository. 👋🏽
This repository is a place for accessibility testing within [Jupyter](https://jupyter.org).

> **Important**
> To learn more about the broader accessibility initiatives within Jupyter, check the [jupyter/accessibility repository][jupyter-accesibility].

## Plans for the future 🚀

Automated accessibility tests cannot address accessibility issues on their own, but used correctly they can be a useful tool.

Work in this repository is modeled after the [JupyterLab Benchmarks](https://github.com/jupyterlab/benchmarks/) repo.

As described in the [Jupyter Accessibility Roadmap](https://github.com/jupyter/accessibility/blob/main/docs/funding/czi-grant-roadmap.md),
the plan is to start by adding tests for JupyterLab.
We are starting with the web app UI, then we will add tests for the docs.
(The rationale for that sequence is to start with the harder problem first.)

After JupyterLab, though it is not within the scope of the grant driving the roadmap,
we hope to extend this testing to other parts of the Jupyter ecosystem beyond JupyterLab.

## Repository orientation 🗺️

This repository is organized as follows:

```txt
.
├── .github
│   ├── .github/workflows                               # set of GitHub actions to run the accessibility tests based on certain type of triggers
│   └── .github/actions                                 # composable actions that perform specific tasks (not to be used on their own but as part of a GitHub actions workflow)
├── testing                                             # root folder for the testing tools
│   └── testing/jupyterlab                              # testing tools and scripts for JupyterLab
│       ├── testing/jupyterlab/manual-testing-scripts   # "recipes" that explain in plain language how automated tests can be also be carried out manually
│       ├── testing/jupyterlab/tests                    # set of Playwright automated tests
│       ├── testing/jupyterlab/environment.yml          # conda environment file to install the dependencies for the automated tests
│       ├── testing/jupyterlab/README.md                # documentation for the JupyterLab tests - start here to learn how to run the tests locally or in GitHub actions
│       ├── testing/jupyterlab/package.json             # npm package file to install the dependencies for the automated tests
│       └── testing/jupyterlab/playwright.config.ts     # Playwright configuration file
│   └── testing/notebooks                               # set of reference Jupyter notebooks to be used in the automated tests
│   └── testing/scripts                                 # set of manual testing scripts for JupyterLab (include relevant WCAG success criteria and step-by-step guides to audit)
├── .pre-commit-config.yaml                             # configuration file for the pre-commit hooks
├── README.md                                           # this file
└── LICENSE                                             # license file
```

## Pre-commit hooks 🧹

This repository uses the `prettier` [pre-commit hook](https://pre-commit.com/) to standardize our YAML and markdown structure.

1. Before you can run the hooks, you need to install the pre-commit package manager:

   ```bash
   # using pip
   pip install pre-commit

   # if you prefer using conda
   conda install -c conda-forge pre-commit
   ```

2. From the root of this project, install the git hook scripts:

   ```bash
   # install the pre-commit hooks
   pre-commit install
   ```

3. Optional- run the hooks against the files in this repository

   ```bash
   # run the pre-commit hooks
   pre-commit run --all-files
   ```

Once installed, the pre-commit hooks will run automatically when you make a commit in version control.

## License 📖

Jupyter uses a shared copyright model that enables all contributors to maintain the copyright on their contributions.
All code is licensed under the terms of the revised [BSD license](https://opensource.org/licenses/BSD-3-Clause).

<!-- links -->

[jupyter-accesibility]: https://github.com/jupyter/accessibility
