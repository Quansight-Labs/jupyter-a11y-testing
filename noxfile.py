import os
from pathlib import Path
from typing import List

import nox

if os.environ.get("CI", None):
    nox.options.error_on_missing_interpreters = True

LOCATIONS = {
    "testing-dir": "testing",
    "playwrigth-config": "testing/playwright.config.js",
}


def setup_environment(session: nox.Session, project: str) -> None:

    session.conda_install(
        "nodejs=16.*",
        "jupyterlab=3.*",
        "ipython",
        "ipywidgets",
        "matplotlib",
        "numpy",
        "scipy",
        channel="conda-forge",
    )

    session.cd(LOCATIONS.get("testing-dir"))
    session.run(
        "npm",
        "install",
        external=False,
    )
    session.run("npx", "playwright", "install")


# ------------------------------------------------------------------------------
# Dev commands
# ------------------------------------------------------------------------------


@nox.session(python="3.9", venv_backend="conda", reuse_venv=True)
def run_a11y_tests(session: nox.Session) -> None:
    """Run accessibility tests."""

    if session.posargs:
        project = session.posargs[0]
    else:
        project = "jupyterlab"

    setup_environment(session, project)

    session.run("npm", "test", "--", "--project", project, external=False)
