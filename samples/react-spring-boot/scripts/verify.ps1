$ErrorActionPreference = 'Stop'
$RootDir = Resolve-Path (Join-Path $PSScriptRoot '..')

Write-Host '[1/2] 驗證 Frontend：typecheck + lint + build'
Push-Location (Join-Path $RootDir 'frontend')
try {
    npm install --no-audit --no-fund
    npm run build
}
finally {
    Pop-Location
}

Write-Host '[2/2] 驗證 Backend：unit + architecture tests'
Push-Location $RootDir
try {
    .\mvnw.cmd -Dskip.frontend=true test
}
finally {
    Pop-Location
}

Write-Host 'Verification completed.'
