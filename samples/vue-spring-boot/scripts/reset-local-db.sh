#!/usr/bin/env sh
set -eu

ROOT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
DB_FILE="$ROOT_DIR/data/wut1-sample.db"

rm -f "$DB_FILE" "$DB_FILE-shm" "$DB_FILE-wal"
printf '%s\n' 'Local SQLite database reset. It will be recreated on the next application start.'
