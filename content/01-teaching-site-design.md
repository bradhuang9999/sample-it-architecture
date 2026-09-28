---
title: 教學網站設計
group: getting-started
kind: course
---

# 教學網站設計

## 1. 教學網站資訊架構（IA）

建議首頁不要先問「你想學 React 還是 Vue？」；應先建立共同心智模型，再讓使用者選技術路線。

```text
首頁：從一個 WUT1 Master / Detail 商業問題開始
│
├─ 00. 先看懂整個系統怎麼跑
│  ├─ Browser / Frontend / Backend / Database
│  ├─ HTTP Request / Response
│  ├─ JSON / REST API
│  └─ Master / Detail + Dashboard + Drill-down
│
├─ 01. 三個專案共通基礎
│  ├─ HTML
│  ├─ CSS / Bootstrap
│  ├─ JavaScript 基礎
│  ├─ TypeScript 基礎
│  ├─ SQL / SQLite
│  ├─ ECharts
│  └─ Test / Verification
│
├─ 02. IT 共用 Backend — Spring Boot
│  ├─ Java 語法
│  ├─ Spring Boot
│  ├─ Spring MVC REST API
│  ├─ Validation / Error Handling
│  ├─ Service / Repository / Transaction
│  ├─ JdbcClient / SQL
│  ├─ Spring Modulith
│  ├─ JUnit / Integration Test
│  ├─ Maven
│  └─ application.yml
│
├─ 03A. IT Frontend — Vue 路線
│  ├─ Vue SFC
│  ├─ Reactivity
│  ├─ Props / Emits
│  ├─ Form / List / Conditional Rendering
│  ├─ Vue Router
│  ├─ API Client
│  ├─ ECharts Wrapper
│  └─ Master / Detail + Dashboard 實作
│
├─ 03B. IT Frontend — React 路線
│  ├─ JSX / TSX
│  ├─ Component / Props
│  ├─ useState / useEffect / useRef / useMemo
│  ├─ React Router
│  ├─ TanStack Query
│  ├─ API Client
│  ├─ ECharts Wrapper
│  └─ Master / Detail + Dashboard 實作
│
├─ 04. Citizen — Python 路線
│  ├─ Python 語法
│  ├─ Pydantic
│  ├─ FastAPI
│  ├─ Jinja2
│  ├─ Vanilla JavaScript
│  ├─ sqlite3
│  └─ pytest / Playwright
│
├─ 05. 同一需求三種實作比較
│  ├─ Master / Detail
│  ├─ 修改 Product
│  ├─ CRUD Trading
│  ├─ Dashboard
│  └─ Drill-down
│
└─ 99. Syntax Index
   ├─ Java
   ├─ Spring
   ├─ Vue
   ├─ React
   ├─ TypeScript / JavaScript
   ├─ Python
   ├─ FastAPI / Jinja2
   ├─ SQL
   ├─ Maven / YAML / TOML / JSON
   ├─ PowerShell
   └─ POSIX Shell
```

---

## 2. 每一個教學頁都使用同一個模板

每頁統一用以下結構，避免「看完 API 文件還是不知道跟專案有什麼關係」。

```text
1. 這一頁要解決什麼問題？
2. 先看結果
3. 心智模型
4. 在 WUT1 專案哪個檔案？
5. 實際程式碼
6. 語法逐段拆解
7. 資料怎麼流動？
8. 常見錯誤
9. Agent 容易寫錯什麼？
10. Human Review 要看什麼？
11. 小練習
12. 如何驗證？
13. 中文延伸閱讀
```

### 教學網站的核心原則

不要用「學會框架」當終點。每一頁最後都要回到：

> **這個語法在解哪一個 Business / Application Problem？**

例如 `useState()` 不應只教「State hook 的 API」，而是：

> Dashboard 點擊 Product 後，頁面需要記住「目前選中的 Product」，這個畫面狀態在 React 版由 `useState()` 保存。

---
