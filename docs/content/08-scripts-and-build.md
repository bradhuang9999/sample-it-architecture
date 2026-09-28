---
title: Scripts 與 Build Tooling
group: shared-foundations
kind: course
---

# Scripts 與 Build Tooling

## 129. PowerShell 語法

Windows 教學環境大量使用 `.ps1`。

### Error policy

```powershell
$ErrorActionPreference = 'Stop'
```

讓很多非 terminating error 也中止 script。

### Variable

```powershell
$RootDir = Resolve-Path "$PSScriptRoot\.."
```

PowerShell variable 使用 `$`。

### `$PSScriptRoot`

目前 script 所在 directory。

### Path

```powershell
$Jar = Join-Path $RootDir 'backend\target\app.jar'
```

### `if`

```powershell
if (-not (Test-Path $Jar)) {
    throw "找不到 JAR"
}
```

### Create Directory

```powershell
New-Item -ItemType Directory -Force $DataDir | Out-Null
```

Pipeline `|`：把前一個 command output 傳給下一個 command。

### Location stack

```powershell
Push-Location $RootDir
try {
    .\mvnw.cmd clean package
}
finally {
    Pop-Location
}
```

### Execute external command

```powershell
java -jar $Jar
```

### 中文延伸閱讀

- [Microsoft Learn 繁中：PowerShell Functions](https://learn.microsoft.com/zh-tw/powershell/module/microsoft.powershell.core/about/about_functions?view=powershell-7.6)

---

# 130. POSIX Shell 語法

Linux/macOS `.sh`：

```sh
#!/usr/bin/env sh
set -eu
```

- `-e`：command fail 就停止。
- `-u`：使用未定義 variable 就 fail。

### Variable

```sh
ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
```

### Command substitution

```sh
$(command)
```

### File test

```sh
if [ ! -f "$JAR" ]; then
  printf '%s\n' "找不到 JAR" >&2
  exit 1
fi
```

### Directory

```sh
mkdir -p "$DATA_DIR"
cd "$ROOT_DIR"
```

### `exec`

```sh
exec java -jar "$JAR"
```

用 Java process 取代目前 shell process。

---
