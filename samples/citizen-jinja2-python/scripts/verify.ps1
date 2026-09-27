$ErrorActionPreference = "Stop"
& .\.venv\Scripts\python.exe -m compileall -q app tests
& .\.venv\Scripts\python.exe -m ruff check app tests
& .\.venv\Scripts\python.exe -m mypy app
& .\.venv\Scripts\python.exe -m pytest
