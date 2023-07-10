# Copyright (c) Jupyter Accessibility Development Team.
# Distributed under the terms of the Modified BSD License.

"""Configuration for a Jupyter Server to be used for the tests."""

from tempfile import mkdtemp

# These settings modeled after https://github.com/jupyterlab/jupyterlab/blob/%40jupyterlab/galata%404.0.2/galata/jupyter_server_test_config.py

c.ServerApp.port = 8888
c.ServerApp.port_retries = 0
c.ServerApp.open_browser = False
c.LabApp.dev_mode = True

c.ServerApp.root_dir = mkdtemp(prefix="galata-test-")
c.ServerApp.token = ""
c.ServerApp.password = ""
c.ServerApp.disable_check_xsrf = True
c.LabApp.expose_app_in_browser = True
