#!/usr/bin/env sh
set -eu

ROOT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
cd "$ROOT_DIR"
./mvnw clean package
printf '%s\n' 'Output: backend/target/wut1-it-app-template.jar'
