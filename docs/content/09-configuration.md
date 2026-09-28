---
title: 設定檔語法
group: shared-foundations
kind: course
---

# 設定檔語法

## 131. `package.json`

Vue / React：

```json
{
  "name": "frontend",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "..."
  },
  "dependencies": {},
  "devDependencies": {},
  "engines": {
    "node": ">=22.16.0"
  }
}
```

### `type: module`

JavaScript 使用 ESM semantics：

```javascript
import ... from ...
export ...
```

### scripts

```powershell
npm run dev
npm run build
npm run typecheck
npm run lint
```

只是一個命令名稱對 shell command 的 map。

---

# 132. `tsconfig.json`

重要 option：

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "strict": true,
    "noEmit": true
  }
}
```

React 還會設定 JSX mode，例如：

```json
"jsx": "react-jsx"
```

主要目的：

- 指定 JavaScript target。
- module handling。
- strict type checking。
- typecheck-only，不直接由 `tsc` 產 build asset；build 交給 Vite。

---

# 133. `.editorconfig`

用來讓 IDE / Agent / Editor 對：

```text
indent
charset
line endings
trim whitespace
```

取得基本一致，不要靠每個人手動設定。

---

# 134. `.gitignore`

目的：不要把 runtime / build / secret / local artifact 全 commit。

例如：

```text
node_modules/
dist/
target/
data/*.db
__pycache__/
.pytest_cache/
```

`data/wut1-sample.db` 在下載 Review ZIP 可以附帶，但不代表它應成為 Git source of truth；Schema source of truth 是 `database/CURRENT_SCHEMA.sql`。

---
