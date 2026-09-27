# ADR-002：Modular Monolith

## Status

Accepted

## Decision

Backend 採單一 Spring Boot Application，但依 Business Domain 建立 Application Module。

```text
com.example.wut1sample
├─ shared
└─ producttrading
```

Business Module 內再分 `api / application / domain / infrastructure`。

## Rationale

- 避免 Microservices 的部署與維運碎片化。
- 保留清楚 Domain Boundary。
- Agent 一次可集中讀取一個 Feature。
- Spring Modulith 可以機械驗證 module dependency。
- 未來如果某 Domain 真的需要獨立服務，已有較清楚的切割邊界。
