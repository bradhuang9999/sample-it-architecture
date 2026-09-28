---
title: Human Review Checklist
group: shared-foundations
kind: course
---

# Human Review Checklist

## 153. 不要求 Reviewer 記住所有框架 API

Reviewer 應依序看：

### Business

- 是否真的符合 SPEC？
- 計算規則正確嗎？
- 例外情境呢？

### Contract

- API Input / Output 改了嗎？
- Nullability / Type 改了嗎？
- Error code 合理嗎？

### Architecture

- Business Rule 是否跑到 Frontend？
- Component 是否直接碰 DB？
- Controller 是否塞過多 logic？
- Feature 是否跨 boundary？

### Security

- 是否直接拼 SQL？
- 是否把未信任字串塞 `innerHTML`？
- 是否繞過 authorization boundary？
- Secret 是否進 repo？

### Verification

- Typecheck？
- Lint？
- Unit test？
- Integration test？
- Architecture test？
- E2E？

---
