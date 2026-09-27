$ErrorActionPreference = 'Stop'
$RootDir = Resolve-Path (Join-Path $PSScriptRoot '..')
Push-Location (Join-Path $RootDir 'frontend')
try {
    npm install --no-audit --no-fund
    npm run dev
}
finally {
    Pop-Location
}
