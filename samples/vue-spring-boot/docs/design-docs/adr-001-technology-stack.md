# ADR-001：Technology Stack

## Status

Accepted

## Decision

正式 IT Application Template：

- Java 25
- Spring Boot 4.1.1
- Spring MVC
- Spring JDBC `JdbcClient`
- Spring Modulith 2.1.1
- Vue 3
- TypeScript
- Vite
- Bootstrap 5
- Apache ECharts
- SQLite（Local Standalone）

## Why

- Java / Spring 與既有 IT 能力、長期企業維護一致。
- Vue 對既有 JSP / HTML 工程師的認知轉換成本相對低。
- TypeScript 把一部分人工 Review 轉成 Compile-time Guardrail。
- Vite 只負責 Frontend 開發與 Build；正式 Runtime 不需要 Node.js。
- JdbcClient 讓 SQL 明確可見，避免教學 Sample 一開始就引入 ORM lifecycle complexity。
- SQLite 讓三個模板使用相同 Sample Schema，且不需先準備 Database Server 即可驗證。

## Not selected by default

- React / Next.js
- Nuxt
- Pinia
- JPA / Hibernate
- GraphQL
- Microservices
- Tailwind
- Heavy Data Grid Framework
