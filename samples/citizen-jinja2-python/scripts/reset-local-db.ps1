$ErrorActionPreference = "Stop"
if (Test-Path ".\data\wut1-citizen.db") {
    Remove-Item ".\data\wut1-citizen.db" -Force
}
Write-Host "Local SQLite database removed. Restart the app to recreate it."
