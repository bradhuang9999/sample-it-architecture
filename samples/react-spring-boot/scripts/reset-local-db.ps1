$ErrorActionPreference = 'Stop'
$RootDir = Resolve-Path (Join-Path $PSScriptRoot '..')
$DbFile = Join-Path $RootDir 'data\wut1-sample.db'

$Candidates = @(
    $DbFile,
    "$DbFile-shm",
    "$DbFile-wal"
)

foreach ($Path in $Candidates) {
    if (Test-Path $Path) {
        Remove-Item -Force $Path
        Write-Host "Removed: $Path"
    }
}

Write-Host 'Local SQLite database reset. It will be recreated on the next application start.'
