$ErrorActionPreference = 'Stop'
$RootDir = Resolve-Path (Join-Path $PSScriptRoot '..')
New-Item -ItemType Directory -Force (Join-Path $RootDir 'data') | Out-Null
$env:WUT1_SKIP_FRONTEND = 'true'
$env:SPRING_PROFILES_ACTIVE = 'local'
Push-Location $RootDir
try {
    .\mvnw.cmd -pl backend spring-boot:run
}
finally {
    Pop-Location
}
