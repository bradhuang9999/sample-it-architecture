$ErrorActionPreference = 'Stop'
$RootDir = Resolve-Path (Join-Path $PSScriptRoot '..')

Write-Host '[1/2] 驗證 Frontend：typecheck + lint + build'
Push-Location (Join-Path $RootDir 'frontend')
try {
    npm install --no-audit --no-fund
    if ($LASTEXITCODE -ne 0) { throw 'Frontend dependency installation failed.' }
    npm run build
    if ($LASTEXITCODE -ne 0) { throw 'Frontend build failed.' }
}
finally {
    Pop-Location
}

Write-Host '[2/2] 驗證 Backend：unit + architecture tests'
Push-Location $RootDir
try {
    $env:WUT1_SKIP_FRONTEND = 'true'
    .\mvnw.cmd test
    if ($LASTEXITCODE -ne 0) { throw 'Backend tests failed.' }
}
finally {
    Pop-Location
}

Write-Host 'Verification completed.'
