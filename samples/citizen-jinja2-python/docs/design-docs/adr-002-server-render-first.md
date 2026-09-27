# ADR-002：Server-render First

## Decision

頁面預設由 Jinja2 Server-side Rendering；局部互動才使用 JavaScript。

## Consequence

不需要 React / Vue / Vite / npm。

當需求需要大量 Client State 時，應重新評估 Application Classification，而不是直接把 Citizen Template 擴充成 SPA Framework。
