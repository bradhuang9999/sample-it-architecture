---
title: Syntax Index
group: reference
kind: reference
---

# Syntax Index

## 138. Java Syntax Index

| Syntax | 意義 | 主要出現位置 |
|---|---|---|
| `package` | Package 宣告 | 所有 Java file |
| `import` | 引用 Type | 所有 Java file |
| `import static` | Static member import | Test |
| `class` | Class | Service / Repository / Error |
| `record` | Immutable data carrier | DTO / Command / Domain |
| `interface` | Contract | Repository |
| `enum` | 有限值集合 | Status / TradeType |
| `extends` | Inheritance | Exception |
| `implements` | 實作 interface | JDBC repository |
| `public/private` | Visibility | 各 class |
| `static` | Class-level member | main / logger |
| `final` | 不重新 assign | dependencies/logger |
| `new` | 建 object | mapping / exceptions |
| `this` | Current instance | constructors/method refs |
| `<T>` | Generic | List/Optional/Map |
| `Optional<T>` | 可能無值 | Repository lookup |
| `List<T>` | List | API / Repository |
| `Map<K,V>` | Key-value | Error detail |
| `var` | Local type inference | Service/Test |
| `->` | Lambda | stream / callbacks |
| `::` | Method reference | mapper |
| `.stream()` | Stream pipeline | mapping |
| `.map()` | Transform | mapping |
| `.toList()` | Collect | API mapping |
| `.orElseThrow()` | Optional absent → exception | Service |
| `if` | Branch | Validation/concurrency |
| `? :` | Ternary | simple conditional |
| `throw` | Throw exception | service/error |
| `try/catch/finally` | Exception/resource flow | infrastructure |
| `"""` | Text block | SQL |
| `@Override` | Override verification | repository/exceptions |
| `BigDecimal` | Decimal arithmetic | money |
| `LocalDate` | Date only | trade date |
| `Instant` | UTC instant | audit timestamp |

---

## 139. Spring Annotation Index

| Syntax | 作用 |
|---|---|
| `@SpringBootApplication` | Boot application entry |
| `@RestController` | REST controller |
| `@RequestMapping` | URL prefix / mapping |
| `@GetMapping` | GET endpoint |
| `@PostMapping` | POST endpoint |
| `@PutMapping` | PUT endpoint |
| `@DeleteMapping` | DELETE endpoint |
| `@PathVariable` | URL path value |
| `@RequestBody` | JSON body → object |
| `@RequestParam` | Query/request parameter |
| `@ResponseStatus` | Response status |
| `@Valid` | Bean validation |
| `@Validated` | Spring validation |
| `@NotBlank` | Nonblank string |
| `@NotNull` | Non-null |
| `@Size` | Length/size |
| `@Pattern` | Regex |
| `@DecimalMin` | Decimal minimum |
| `@Service` | Service bean |
| `@Repository` | Repository bean |
| `@Component` | General bean |
| `@Transactional` | Transaction boundary |
| `@RestControllerAdvice` | Global REST advice |
| `@ExceptionHandler` | Exception mapping |
| `@Value` | Config injection |
| `@SpringBootTest` | Boot integration test |
| `@Autowired` | Inject dependency in test/sample |
| `@ActiveProfiles` | Activate profile |
| `@TestPropertySource` | Test config override |
| `@ApplicationModule` | Modulith module metadata |
| `@Test` | JUnit test |

---

## 140. Vue Syntax Index

| Syntax | 作用 |
|---|---|
| `<script setup lang="ts">` | SFC Composition API + TS |
| `<template>` | UI template |
| `ref()` | Reactive scalar/reference |
| `.value` | Script 中取 ref value |
| `reactive()` | Reactive object |
| `computed()` | Derived state |
| `watch()` | Observe change + side effect |
| `onMounted()` | Mounted lifecycle |
| `onBeforeUnmount()` | Cleanup lifecycle |
| `defineProps<T>()` | Typed props |
| `defineEmits<T>()` | Typed component events |
| `{{ expr }}` | Text interpolation |
| `:prop` | `v-bind` shorthand |
| `@event` | `v-on` shorthand |
| `@submit.prevent` | event + preventDefault |
| `v-model` | Two-way form binding |
| `v-model.number` | Input number coercion |
| `v-if` | Conditional |
| `v-else-if` | Conditional |
| `v-else` | Conditional |
| `v-for` | List rendering |
| `:key` | Stable list identity |
| `ref="name"` | Template DOM ref |
| `<RouterLink>` | Navigation |
| `<RouterView>` | Route outlet |
| `createRouter()` | Router instance |
| `createWebHashHistory()` | Hash history |

---

## 141. React Syntax Index

| Syntax | 作用 |
|---|---|
| `function Component()` | Functional Component |
| `<Component />` | JSX component |
| `{expression}` | JSX expression |
| `className` | CSS class |
| `value={...}` | Controlled value |
| `onChange={...}` | Change event |
| `onSubmit={...}` | Submit event |
| `.map(...)` | List render |
| `key={id}` | Stable list identity |
| `condition ? A : B` | Conditional render |
| `condition && <X/>` | Conditional render |
| `useState()` | Local UI state |
| `useEffect()` | External side effect |
| `useRef()` | DOM / mutable ref |
| `useMemo()` | Memoized derived value |
| `PropsWithChildren` | Provider children type |
| `createRoot()` | React DOM root |
| `<StrictMode>` | Dev checks |
| `createHashRouter()` | Router |
| `<Navigate>` | Redirect/navigation |
| `<Outlet>` | Nested route slot |
| `<NavLink>` | Link with active state |
| `QueryClient` | Query cache/client |
| `<QueryClientProvider>` | Query context |
| `useQuery()` | Read server state |
| `useMutation()` | Change server state |
| `useQueryClient()` | Access query client |
| `invalidateQueries()` | Mark cached data stale |
| `queryKey` | Server-state identity |
| `queryFn` | Fetch function |
| `enabled` | Conditional query |
| `mutationFn` | Mutation function |
| `onSuccess` | Mutation callback |
| `mutateAsync()` | Execute mutation as Promise |

---

## 142. TypeScript / JavaScript Syntax Index

| Syntax | 作用 |
|---|---|
| `import` / `export` | ES Modules |
| `const` / `let` | Variable binding |
| `interface` | Object type contract |
| `type` | Type alias |
| `string \| null` | Union type |
| `prop?` | Optional property |
| `<T>` | Generic |
| `Promise<T>` | Async result type |
| `unknown` | Unknown-safe type |
| `Record<K,V>` | Key/value object type |
| `as` | Type assertion |
| `as const` | Literal readonly inference |
| `...obj` | Spread |
| `{ a } = obj` | Destructuring |
| `` `${x}` `` | Template literal |
| `?.` | Optional chaining |
| `??` | Nullish coalescing |
| `=>` | Arrow function |
| `async` / `await` | Promise async flow |
| `try/catch/finally` | Error flow |
| `Promise.all()` | Parallel waiting |
| `instanceof` | Runtime type narrowing |
| `.map()` | Array transform |
| `.find()` | Find item |
| `.join()` | Join strings |
| `URLSearchParams` | Query string |
| `document.getElementById()` | DOM lookup |
| `.addEventListener()` | DOM event |
| `.closest()` | Find ancestor |
| `.dataset` | `data-*` access |

---

## 143. Python Syntax Index

| Syntax | 作用 |
|---|---|
| `from __future__ import annotations` | Deferred annotation behavior |
| `import` / `from ... import` | Module import |
| `as` | Import alias |
| `def` | Function |
| `async def` | Async function |
| `-> Type` | Return type hint |
| `str \| None` | Union type |
| `list[T]` | Generic list hint |
| `Literal[...]` | Literal type |
| `class` | Class |
| `__init__` | Constructor initializer |
| `self` | Current instance |
| `@decorator` | Decorator |
| `@staticmethod` | Static method |
| `@dataclass` | Dataclass generation |
| `if/else` | Branch |
| `a if cond else b` | Conditional expression |
| `[x for x in xs]` | List comprehension |
| `with` | Context manager |
| `yield` | Generator / context resource |
| `try/except/finally` | Error/resource flow |
| `raise` | Throw error |
| `assert` | Test assertion |
| `f"{x}"` | F-string |
| `{}` | Dict |
| `**mapping` | Keyword unpacking |
| `Path / "child"` | pathlib join |
| `Decimal` | Exact decimal |
| `date.fromisoformat()` | Parse ISO date |

---

## 144. FastAPI / Pydantic / Jinja Index

| Syntax | 作用 |
|---|---|
| `FastAPI(...)` | App instance |
| `APIRouter()` | Feature router |
| `@router.get/post/put/delete` | Endpoint |
| `response_model=` | Response schema |
| `status_code=` | HTTP status |
| `Request` | Request object |
| `HTMLResponse` | HTML response class |
| `JSONResponse` | Explicit JSON response |
| `RedirectResponse` | Redirect |
| `app.include_router()` | Register router |
| `app.mount()` | Static files mount |
| `StaticFiles` | Static server |
| `Jinja2Templates` | Template engine integration |
| `TemplateResponse` | Render template |
| `BaseModel` | Pydantic schema |
| `Field(...)` | Validation constraints |
| `{{ value }}` | Jinja expression |
| `{% extends %}` | Template inheritance |
| `{% block %}` | Override block |
| `{% endblock %}` | Block end |
| `url_for(...)` | URL generation |

---

## 145. SQL Syntax Index

| Syntax | 作用 |
|---|---|
| `PRAGMA foreign_keys = ON` | SQLite foreign key enforcement |
| `CREATE TABLE IF NOT EXISTS` | 建 table |
| `PRIMARY KEY` | Primary key |
| `AUTOINCREMENT` | Auto identity |
| `NOT NULL` | Required |
| `DEFAULT` | Default value |
| `UNIQUE` | Unique constraint |
| `CHECK` | Check constraint |
| `FOREIGN KEY ... REFERENCES` | FK |
| `CREATE INDEX` | Index |
| `INSERT OR IGNORE` | Insert, conflict ignore |
| `SELECT` | Query |
| `FROM` | Source |
| `WHERE` | Filter |
| `ORDER BY` | Sort |
| `LEFT JOIN` | Join |
| `ON` | Join condition |
| `GROUP BY` | Aggregate grouping |
| `COUNT()` | Count |
| `SUM()` | Sum |
| `COALESCE()` | Null fallback |
| `strftime()` | SQLite date formatting |
| `UPDATE ... SET` | Update |
| `DELETE` | Delete |
| `ROW_VERSION = ROW_VERSION + 1` | App-managed version increment |

---
