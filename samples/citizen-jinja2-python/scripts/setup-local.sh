#!/usr/bin/env bash
set -e
python3 -m venv .venv
. .venv/bin/activate
python -m pip install --upgrade pip
python -m pip install -r requirements-dev.txt
printf '\nLocal environment ready.\n'
