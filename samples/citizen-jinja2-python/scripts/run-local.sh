#!/usr/bin/env bash
set -e
. .venv/bin/activate
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
