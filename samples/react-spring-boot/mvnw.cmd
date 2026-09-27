@echo off
setlocal

where mvn >nul 2>nul
if %ERRORLEVEL% EQU 0 (
  mvn %*
  exit /b %ERRORLEVEL%
)

set ROOT_DIR=%~dp0
set PROPS=%ROOT_DIR%.mvn\wrapper\maven-wrapper.properties
for /f "tokens=1,* delims==" %%A in (%PROPS%) do (
  if "%%A"=="distributionUrl" set DIST_URL=%%B
  if "%%A"=="distributionSha512Sum" set EXPECTED_SHA512=%%B
)

if "%DIST_URL%"=="" (
  echo Cannot read Maven distributionUrl from %PROPS% 1>&2
  exit /b 1
)

powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "$ErrorActionPreference='Stop';" ^
  "$url='%DIST_URL%';" ^
  "$expected='%EXPECTED_SHA512%';" ^
  "$name=[IO.Path]::GetFileName($url);" ^
  "$dist=$name -replace '-bin\.zip$','';" ^
  "$m2=if($env:MAVEN_USER_HOME){$env:MAVEN_USER_HOME}else{Join-Path $HOME '.m2'};" ^
  "$mavenHome=Join-Path $m2 ('wrapper\dists\'+$dist+'\wut1');" ^
  "$mvn=Join-Path $mavenHome 'bin\mvn.cmd';" ^
  "if(-not(Test-Path $mvn)){" ^
    "$tmp=Join-Path ([IO.Path]::GetTempPath()) ('wut1-mvn-'+[guid]::NewGuid()); New-Item -ItemType Directory -Path $tmp | Out-Null;" ^
    "try{" ^
      "$zip=Join-Path $tmp $name; Write-Host ('Maven not found. Downloading '+$url);" ^
      "Invoke-WebRequest -UseBasicParsing -Uri $url -OutFile $zip;" ^
      "$sha=[Security.Cryptography.SHA512]::Create(); $actual=([BitConverter]::ToString($sha.ComputeHash([IO.File]::ReadAllBytes($zip))) -replace '-','').ToLowerInvariant(); $sha.Dispose(); if($actual -ne $expected){throw 'Maven distribution SHA-512 verification failed.'};" ^
      "Expand-Archive $zip -DestinationPath $tmp;" ^
      "New-Item -ItemType Directory -Force -Path (Split-Path $mavenHome) | Out-Null;" ^
      "if(Test-Path $mavenHome){Remove-Item -Recurse -Force $mavenHome};" ^
      "Move-Item (Join-Path $tmp $dist) $mavenHome;" ^
    "}finally{if(Test-Path $tmp){Remove-Item -Recurse -Force $tmp}}" ^
  "};" ^
  "if($env:WUT1_SKIP_FRONTEND -eq 'true'){& $mvn '-Dskip.frontend=true' %*}else{& $mvn %*}; exit $LASTEXITCODE"

exit /b %ERRORLEVEL%
