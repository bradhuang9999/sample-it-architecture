# Design 原則

本 Template 的設計目標不是展示最多 Framework，而是建立一條可重複、可驗證、可由 AI 協作維護的 IT Golden Path。

## 主要原則

1. **Business Feature 優先**  
   程式依商業問題切分，不以 `controller/service/repository` 全域資料夾切散同一個需求。

2. **AI Write, Human Review, Machine Verify**  
   Agent 可以大量實作，但完成條件必須由 Type、Test、Architecture Rule 與可觀察結果共同證明。

3. **Compiler / Test 取代記憶型規範**  
   可以機械化的規則，不只寫在文件裡。

4. **少量依賴**  
   不因為某 Library 流行就加入。新依賴必須解決目前存在的問題。

5. **允許局部重複，避免過早抽象**  
   Business-specific Component 留在 Feature；只有真正跨 Domain 的穩定能力才進 `shared`。

6. **Database Schema 由人治理**  
   Local SQLite 可自動初始化 Sample Schema；正式 Database 不由 Application 自動異動。
