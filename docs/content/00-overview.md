---
title: 導讀：這份教學要解決什麼問題
group: getting-started
kind: course
---

# 導讀：這份教學要解決什麼問題

> 適用專案：
>
> 1. **IT Vue Template**：Spring Boot 4 + Vue 3 + TypeScript + Vite + Bootstrap 5 + ECharts + SQLite
> 2. **IT React Template**：Spring Boot 4 + React + TypeScript + Vite + React Router + TanStack Query + Bootstrap 5 + ECharts + SQLite
> 3. **Citizen Python Template**：Python + FastAPI + Pydantic + Jinja2 + Bootstrap 5 + ECharts + Vanilla JavaScript + SQLite

---

## 0. 這份文件要解決什麼問題

這份文件不是「把 Java、Vue、React、Python 的官方手冊全部重寫一次」。它的目標是設計一個**可以直接拿來做內部教學網站**的完整課綱與內容骨架，讓一位原本只熟悉 JSP、甚至對現代前後端工具鏈不熟悉的人，可以從三個範例專案反向學會：

- 瀏覽器、Frontend、Backend、Database 各自負責什麼。
- Spring Boot 專案中實際出現的 Java / Spring / Maven / YAML / SQL 語法。
- Vue 專案中實際出現的 Vue / TypeScript / Vite / Router / ECharts 語法。
- React 專案中實際出現的 React / TypeScript / React Router / TanStack Query / ECharts 語法。
- Citizen 專案中實際出現的 Python / FastAPI / Pydantic / Jinja2 / Vanilla JavaScript / SQLite 語法。
- 三個專案共用的 HTML / CSS / Bootstrap / HTTP / REST / JSON / Testing / PowerShell / Shell 概念。
- 為什麼同一個商業問題，在 IT 與 Citizen Developer 的 Golden Path 中會有不同的技術解法。

### 「所有語法」的範圍定義

本文所稱的「所有語法」是：

> **三個 Sample Template 實際使用到的語言語法、框架語法、設定檔語法、測試語法與主要 API pattern。**

不代表教完 Java、Python、JavaScript、Vue 或 React 的全部語言功能。例如專案沒有使用 Java reflection、React Server Components、Vue Pinia、Python async database ORM，就不會把它們納入必修範圍。

這個範圍非常重要，因為教學網站的目的不是培養框架專家，而是讓使用者能夠：

1. **讀懂專案。**
2. **看懂 Agent 產生的修改。**
3. **知道資料從哪裡來、到哪裡去。**
4. **知道怎麼驗證。**
5. **把注意力移到 Business Problem、Business Rule 與 Acceptance Criteria。**

---
