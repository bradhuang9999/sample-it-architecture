# Reliability

Citizen App 不以大型核心系統 SLA 為假設。

最低要求：

- API Error 必須明確顯示，不靜默失敗。
- DB Transaction 失敗要 rollback。
- 更新衝突回傳 409。
- Business Rule 必須有 deterministic test。
- 啟動時 Local Schema / Sample Data 可重建。

若應用開始被大量人員、核心流程或其他系統依賴，應觸發 Graduation Review。
