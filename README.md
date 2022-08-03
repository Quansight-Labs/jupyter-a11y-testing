# Jupyter accessibility testing tools

<!-- prettier-ignore-start -->
<!-- ignoring because prettier by default adds loads of spaces -->
Information | Links
---------|----------
 Project | [![OSI License badge - BSD-3](https://img.shields.io/badge/License-BSD%203--Clause-gray.svg?colorA=2D2A56&colorB=5936D9&style=flat.svg)](https://opensource.org/licenses/BSD-3-Clause)
<!-- prettier-ignore-end -->

Welcome to the Jupyter accessibility testing tools repository 👋🏽 .
To learn more about the broader accessibility initiatives within Jupyter, check the [jupyter/accessibility repository][jupyter-accesibility].

## 🧹 Pre-commit hooks

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

## 📖 License

[This project is licensed under the BSD-3-Clause license](https://opensource.org/licenses/BSD-3-Clause).

<!-- links -->

[jupyter-accesibility]: https://github.com/jupyter/accessibility
