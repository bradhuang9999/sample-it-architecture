$ErrorActionPreference = 'Stop'
$RootDir = Resolve-Path (Join-Path $PSScriptRoot '..')
$Jar = Join-Path $RootDir 'backend\target\wut1-it-app-template.jar'

if (-not (Test-Path $Jar)) {
    throw "找不到 $Jar。請先執行 scripts\build-app.ps1。"
}

New-Item -ItemType Directory -Force (Join-Path $RootDir 'data') | Out-Null
Push-Location $RootDir
try {
    java -jar $Jar
}
finally {
    Pop-Location
}
