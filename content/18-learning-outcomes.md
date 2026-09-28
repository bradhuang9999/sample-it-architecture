---
title: 最後應該教會什麼
group: citizen-and-comparison
kind: course
---

# 最後應該教會什麼

## 156. 對 IT Developer

最後不是要求：

> 可以不查文件手寫所有 React / Vue / Spring annotation。

而是要求能回答：

1. 這個 Business Feature 放在哪？
2. Request 如何走到 DB？
3. Business Rule 在哪裡？
4. API contract 是什麼？
5. State 誰擁有？
6. 哪些是 Server State，哪些是 UI State？
7. 哪些 boundary 不能跨？
8. Agent 修改後要跑哪些 verification？
9. 哪些 error 應該被使用者看到？
10. 如何知道結果真的正確？

---

## 157. 對 Citizen Developer

最後不是要求：

> 成為 Python / JavaScript 工程師。

而是要求能回答：

1. 問題是什麼？
2. Input 是什麼？
3. Output 是什麼？
4. Business Rule 是什麼？
5. 哪些 Rule 可以固定成 Program？
6. 哪些資料允許取得？
7. 哪些能力只能透過 Enterprise API？
8. Acceptance Criteria 是什麼？
9. Test 如何證明結果？
10. 什麼時候這個工具已經超過 Citizen Application 的安全邊界？

---

# 158. 最終教學主張

這三個專案不是三套互相競爭的技術。

```text
IT Vue
IT React
Citizen Python
```

真正共同的核心是：

```text
Business Problem
      ↓
Spec
      ↓
Clear Boundary
      ↓
Agent-friendly Implementation
      ↓
Executable Verification
      ↓
Human Review
```

語法能力的角色正在改變：

```text
過去：
人記住語法 → 人寫大部分程式 → 人靠經驗 Review

未來：
人理解 Business / Architecture → Agent 寫大量程式
→ Compiler / Typecheck / Lint / Test 做機械檢查
→ 人 Review Rule / Contract / Boundary / Outcome
```

因此，這個教學網站最不應該變成一個「Vue / React / FastAPI API 背誦網站」。

它應該是一個：

> **以真實 Business Feature 為主線，教人讀懂 Agent 產出的系統、判斷責任邊界、驗證結果，並在需要時知道去哪一份中文技術文件深入查詢的網站。**


---
