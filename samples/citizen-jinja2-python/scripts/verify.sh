#!/usr/bin/env bash
set -e
. .venv/bin/activate
python -m compileall -q app tests
python -m ruff check app tests
python -m mypy app
python -m pytest
