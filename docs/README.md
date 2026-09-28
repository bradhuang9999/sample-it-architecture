# 三種架構教學網站

這是一個純靜態網站。教學內容以 `content/` 下可獨立閱讀的 Markdown 章節為唯一來源，`index.html` 與 `chapters/*.html` 是預先產生的靜態產物。

## 技術

- Bootstrap 5.3.6（本地檔案）
- `academy.css`
- 少量 Vanilla JavaScript
- 讀者不需要 Node.js、不需要後端服務

## 內容與導覽

- `content/`：可編輯的課程與參考資料 Markdown。
- `navigation.json`：左側導覽的群組、名稱與排序；網站不再依 Markdown 標題層級自動產生目錄。
- `archive/`：已淘汰的單一大檔原稿，僅供追溯，不再維護。

## 維護與建置

維護者在 `learn/` 目錄執行：

```bash
npm install
npm run build
```

`npm run verify` 會重新產生頁面並檢查導覽、資產與內部連結。Node.js 僅在建置時需要；產出的網站可以直接開啟。

## 開啟方式

直接開啟 `index.html` 即可。

若瀏覽器對 `file://` 有限制，可在目錄中執行：

```bash
python -m http.server 8080
```

再開啟 `http://localhost:8080/`。

## 網站功能

- 左側 Part / Chapter 導覽
- 章節 Scroll Spy
- 全文標題與內容搜尋（Ctrl+K）
- 三條學習路線快速入口
- 程式碼一鍵複製
- academy 字級切換
- Mobile Sidebar
- Print-friendly layout
- 原始 Markdown 下載
