$ErrorActionPreference = 'Stop'
$RootDir = Resolve-Path (Join-Path $PSScriptRoot '..')
Push-Location $RootDir
try {
    .\mvnw.cmd clean package
}
finally {
    Pop-Location
}
Write-Host 'Output: backend\target\wut1-it-app-template.jar'
