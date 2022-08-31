from pathlib import Path
from shutil import copytree
from doit.tools import create_folder

HERE = Path()
ROOT = HERE.parent
AXE_TEMPLATE = ROOT / "jupyter-axe"


##############################################################################################
## Helpers
##############################################################################################


def do(*args, cwd=ROOT, **kwargs):
    """wrap a Action for consistency"""
    from os import environ
    from shlex import split

    from doit.tools import CmdAction

    if len(args) == 1:
        args = split(args[0])
    kwargs.setdefault("env", {})
    kwargs["env"] = {**environ, **kwargs["env"]}
    return CmdAction(list(map(str, args)), shell=False, cwd=str(Path(cwd).resolve()), **kwargs)

def remove_directory(*dir):
    """remove a directory during the clean stage"""
    from shutil import rmtree

    for dir in dir:
        rmtree(dir, True)
        print(f"removed directory: {dir}")

def move_directory(src, target):
    copytree(src, target, dirs_exist_ok=True)


##############################################################################################
## Tasks
##############################################################################################


build_dir = ROOT / "build"
conda_env_dir = build_dir / ".env"
prefix = conda_env_dir.resolve()
conda = f"conda run --no-capture-output --prefix {prefix}"

def task_create_env():
    """Create a test environment into which dependencies needed by the test code will be installed"""
    yield dict(
        name="conda",
        actions=[
            do(
                f'conda create -yc conda-forge --prefix {prefix} python=3.9 "nodejs>=14,<15" yarn git'
            ),
            do(f"{conda} python -m pip install pip --upgrade"),
        ],
        uptodate=[prefix.exists()],
        clean=[(remove_directory, [prefix])],
    )

name = "jupyterlab"

def task_install_app():
    """Install the app under test into the test environment"""
    yield dict(
        name=f"pip:{name}",
        actions=[do(f"{conda} python -m pip install {name}")],
        clean=[do(f"{conda} python -m pip uninstall -y {name}")],
    )

def task_install_test_deps():
    """Install the Python and Node.js dependencies needed by the test code"""
    target = build_dir / AXE_TEMPLATE.name
    yield dict(
        name="copy-templates",
        actions=[(move_directory, [AXE_TEMPLATE, target])],
        clean=[(remove_directory, [target])],
        uptodate=[target.exists()],
    )
    yield dict(
        name="pip",
        actions=[do(f"{conda} pip install -r requirements.txt", cwd=target)],
    )
    yield dict(
        name="yarn",
        actions=[do(f"{conda} yarn install", cwd=target)],
    )
    yield dict(
        name="playwright",
        actions=[
            do(f"{conda} npx playwright install --with-deps chromium", cwd=target)
        ],
    )

def task_test():
    """Run the tests"""
    target = build_dir / AXE_TEMPLATE.name
    yield dict(
        name="playwright",
        actions=[
            do(f"echo 'the target is {target.absolute()}'"),
            do(f"{conda} npx playwright test", cwd=target),
        ],
    )
