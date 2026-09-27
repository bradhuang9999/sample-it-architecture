# Execution Plan 規則

小修改可以直接在 Task / PR 中處理；涉及跨層、跨模組或需多次驗證的工作，建立 Execution Plan。

## Active Plan

放在：

```text
docs/exec-plans/active/
```

至少記錄：

- Problem / Goal
- Scope
- Out of Scope
- Assumptions
- Implementation Steps
- Verification
- Decisions
- Risks
- Progress

## 完成後

完成的 Plan 移至：

```text
docs/exec-plans/completed/
```

不得只因為程式已 Merge 就刪除重要設計決策。

## Technical Debt

已知但本次不處理的問題，放在：

`docs/exec-plans/tech-debt-tracker.md`
