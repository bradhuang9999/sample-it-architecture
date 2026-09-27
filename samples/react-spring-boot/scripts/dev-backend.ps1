$ErrorActionPreference = 'Stop'
$RootDir = Resolve-Path (Join-Path $PSScriptRoot '..')
Push-Location $RootDir
try {
    .\mvnw.cmd -pl backend -Dskip.frontend=true spring-boot:run -Dspring-boot.run.profiles=local
}
finally {
    Pop-Location
}
