#!/usr/bin/env sh
set -eu

ROOT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
JAR="$ROOT_DIR/backend/target/wut1-it-app-template.jar"

if [ ! -f "$JAR" ]; then
    printf '%s\n' "找不到 $JAR。請先執行 scripts/build-app.sh。" >&2
    exit 1
fi

mkdir -p "$ROOT_DIR/data"
cd "$ROOT_DIR"
exec java -jar "$JAR" --spring.profiles.active=local
