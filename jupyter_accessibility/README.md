# Testing - Jupyter Accessibility

## 🚧 WIP - Work in Progress

The code in this directory is a work in progress toward running automated
accessibility tests against
[JupyterLab](https://github.com/jupyterlab/jupyterlab).

## Install

In order to run the code, you must install two things:

1. [Install
   Conda](https://docs.conda.io/projects/conda/en/latest/user-guide/install/index.html)
2. [Install Doit](https://pydoit.org/install.html)

## Run

After installing the pre-requisites, run the following commands from this
directory:

```sh
doit create_env
doit install_app
doit install_test_deps
doit test
```
