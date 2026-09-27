#!/usr/bin/env sh
set -eu

ROOT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)

printf '%s\n' '[1/2] 驗證 Frontend：typecheck + lint + build'
cd "$ROOT_DIR/frontend"
npm install --no-audit --no-fund
npm run build

printf '%s\n' '[2/2] 驗證 Backend：unit + architecture tests'
cd "$ROOT_DIR"
./mvnw -Dskip.frontend=true test

printf '%s\n' 'Verification completed.'
