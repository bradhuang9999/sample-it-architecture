# ADR-004：Executable JAR

## Status

Accepted

## Decision

新 IT Application 以 Spring Boot executable JAR 作為正式部署單位。

Frontend 由 Vite Build 成 static assets，打包進同一個 JAR。

## Runtime

```text
java -jar application.jar
```

## Why

- Application 自包含 Embedded Tomcat。
- 不依賴外部 Tomcat 的共享設定。
- 部署單位、版本與 Runtime Boundary 更清楚。
- 未來轉為 Container 時不需改寫 Application Structure。
- Production 不需要 Node.js / Vite Runtime。
