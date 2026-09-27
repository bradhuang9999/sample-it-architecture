# Reliability

## Runtime

正式應用以單一 Spring Boot executable JAR 啟動。

```bash
java -jar wut1-it-app-template.jar
```

## Health

Spring Boot Actuator 暴露：

- `/actuator/health`
- `/actuator/info`

正式環境應由 Reverse Proxy / Load Balancer / Monitoring 平台觀測 health。

## Failure Boundary

- Frontend Error：顯示可理解的錯誤狀態，不顯示 Java stack trace。
- Backend Validation：回傳 400。
- Resource Not Found：回傳 404。
- Optimistic Concurrency Conflict：回傳 409。
- Database Failure：記錄 server-side log，Client 只收到一般錯誤資訊。

## Logging

- 不使用 `System.out.println` 作正式 log。
- 避免記錄密碼、Token、完整敏感資料。
- 正式公司環境應接既有 Observability / Audit 平台。

## Restart

Application 必須能以外部設定重新啟動，不依賴 Developer 本機狀態。
