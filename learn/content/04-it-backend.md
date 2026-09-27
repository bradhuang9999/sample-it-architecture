---
title: IT 共用 Backend：Java 與 Spring Boot
group: it-backend
kind: course
---

# IT 共用 Backend：Java 與 Spring Boot

## 12. 先看懂 Backend Folder Structure

Vue / React 兩個 IT Template 共用同一套 Backend：

```text
backend/src/main/java/com/example/wut1sample/
│
├─ SampleApplication.java
│
├─ producttrading/
│  ├─ api/
│  │  ├─ ProductTradingController.java
│  │  ├─ ProductTradingDashboardController.java
│  │  ├─ ProductTradingApiMapper.java
│  │  └─ dto/
│  │
│  ├─ application/
│  │  ├─ ProductTradingService.java
│  │  ├─ ProductTradingDashboardService.java
│  │  ├─ RowVersionCodec.java
│  │  ├─ UpdateProductCommand.java
│  │  └─ UpsertTradingCommand.java
│  │
│  ├─ domain/
│  │  ├─ Product.java
│  │  ├─ Trading.java
│  │  ├─ ProductStatus.java
│  │  ├─ TradeType.java
│  │  └─ ProductTradingRepository.java
│  │
│  └─ infrastructure/
│     └─ persistence/
│        └─ JdbcProductTradingRepository.java
│
└─ shared/
   ├─ audit/
   └─ error/
```

這不是為了「分越多層越專業」，而是建立清楚依賴方向：

```text
api
 ↓
application
 ↓
domain
 ↑
infrastructure
```

Human Review 第一個問題不是「這段 Java 漂不漂亮」，而是：

> **這個 Business Logic 放的位置對不對？**

---

# 13. Java 基本語法：專案中實際會看到的全部主要形式

## 13.1 `package`

```java
package com.example.wut1sample.producttrading.domain;
```

用途：指定 class 所屬 namespace / package。

Folder 通常與 package 對應：

```text
com/example/wut1sample/producttrading/domain/Product.java
```

---

## 13.2 `import`

```java
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
```

Static import：

```java
import static org.assertj.core.api.Assertions.assertThat;
```

使用後可以直接：

```java
assertThat(result).isNotNull();
```

而不必寫完整 class name。

---

## 13.3 `class`

```java
public class ProductTradingService {
}
```

主要語法：

```text
[access modifier] class ClassName {
}
```

### Access modifier

- `public`：其他 package 可見。
- `private`：只有同一 class 可見。
- package-private：不寫 modifier，只有 package 內可見。

---

## 13.4 Constructor

```java
public ProductTradingService(ProductTradingRepository repository) {
    this.repository = repository;
}
```

`this.repository`：目前 object 的 field。

Spring 專案使用 constructor injection，讓 dependency 明確而且容易 test。

---

## 13.5 Field / `final`

```java
private final ProductTradingRepository repository;
```

`final` 在這裡代表 reference 初始化後不重新指向別的 object。

常見 static constant：

```java
private static final Logger log =
    LoggerFactory.getLogger(ProductTradingService.class);
```

---

## 13.6 Method

```java
public Product getProduct(long prodId) {
    // ...
}
```

拆解：

```text
public          access
Product         return type
getProduct      method name
(long prodId)   parameters
```

Void method：

```java
public void deleteTrading(long tradingId) {
}
```

---

## 13.7 Primitive 與常見 Reference Type

專案中主要會看到：

```java
long id;
int count;
String name;
BigDecimal amount;
LocalDate tradeDate;
Instant timestamp;
```

### 為什麼金額不用 `double`？

保險、交易、會計類金額應使用：

```java
BigDecimal
```

避免 binary floating-point 精度問題。

---

## 13.8 `record`

DTO / Command / Domain value 很適合：

```java
public record UpdateProductCommand(
    String prodName,
    String prodCategory,
    ProductStatus prodStatus,
    String currencyCode,
    BigDecimal listPrice,
    long expectedRowVersion
) {
}
```

Record 自動提供主要 constructor、accessor、`equals`、`hashCode`、`toString`。

讀值：

```java
command.prodName()
```

不是傳統 Bean：

```java
command.getProdName()
```

---

## 13.9 `enum`

```java
public enum ProductStatus {
    ACTIVE,
    INACTIVE
}
```

Trading：

```java
public enum TradeType {
    BUY,
    SELL
}
```

用途：把合法值限制在有限集合，而不是到處傳任意 String。

---

## 13.10 `interface`

```java
public interface ProductTradingRepository {
    Optional<Product> findProduct(long prodId);
    List<Trading> findTradingByProduct(long prodId);
}
```

Domain 定義「需要什麼能力」，Infrastructure 實作 SQL 細節。

Implementation：

```java
public class JdbcProductTradingRepository
        implements ProductTradingRepository {
}
```

---

## 13.11 `extends`

Exception：

```java
public class NotFoundException extends RuntimeException {
}
```

表示 inheritance。

---

## 13.12 Generic：`List<T>` / `Optional<T>` / `Map<K,V>`

```java
List<Product> products;
Optional<Product> product;
Map<String, Object> details;
```

`<T>` 指 container 內的 type。

### Optional

```java
return repository.findProduct(prodId)
    .orElseThrow(() -> new NotFoundException("找不到產品"));
```

語意是：結果可能不存在，但不要用裸 `null` 隱藏這件事。

---

## 13.13 Lambda

```java
item -> item.amount()
```

多行：

```java
item -> {
    log.info("item={}", item);
    return item.amount();
}
```

專案中常出現在：

- Stream `.map(...)`
- `orElseThrow(() -> ...)`
- Result mapping / callback

---

## 13.14 Method Reference

```java
ProductTradingApiMapper::toResponse
```

相當於：

```java
item -> ProductTradingApiMapper.toResponse(item)
```

Instance method reference：

```java
this::mapProduct
```

---

## 13.15 Stream API

```java
return products.stream()
    .map(ProductTradingApiMapper::toResponse)
    .toList();
```

讀法：

```text
List
 ↓ stream()
逐筆資料流
 ↓ map()
轉換
 ↓ toList()
重新收集成 List
```

---

## 13.16 `var`

```java
var result = repository.findDashboardSummary();
```

Compiler 仍知道 type，只是由右側推導。

教學上要區分：Java `var` **不是** JavaScript 的動態型別。

---

## 13.17 Java Text Block `"""`

專案 SQL 很適合：

```java
String sql = """
    SELECT
        PROD_ID,
        PROD_CODE,
        PROD_NAME
    FROM SAMPLE_PROD
    ORDER BY PROD_CODE
    """;
```

比大量 `"..." +` 更適合 Human Review SQL。

---

## 13.18 `if`

```java
if (updatedRows == 0) {
    throw new ConflictException("資料已被其他人修改");
}
```

---

## 13.19 Ternary Operator

```java
String value = remark == null ? "" : remark;
```

形式：

```text
condition ? whenTrue : whenFalse
```

---

## 13.20 Exception

```java
throw new NotFoundException("找不到產品");
```

Catch：

```java
try {
    // ...
} catch (RuntimeException ex) {
    // ...
}
```

不應用 exception 取代正常 Business branching；它適合表達 abnormal/error flow。

---

## 13.21 `@Override`

```java
@Override
public Optional<Product> findProduct(long prodId) {
}
```

告訴 compiler：此 method 應該是實作 / 覆寫 parent/interface method。

如果 signature 不匹配，compiler 會協助抓錯。

---

## 13.22 `BigDecimal`

```java
amount = quantity
    .multiply(unitPrice)
    .setScale(2, RoundingMode.HALF_UP);
```

需要理解：

- `multiply()` 不會改原物件，會回傳新的 BigDecimal。
- `setScale()` 明確定義小數位與 rounding rule。

---

## 13.23 Date / Time

```java
LocalDate tradeDate;
Instant createdAt;
```

- `LocalDate`：只有年月日，例如 Trade Date。
- `Instant`：時間軸上的 UTC instant，適合 audit timestamp。

### 中文延伸閱讀

- [廖雪峰 Java 教程：Java 基礎](https://liaoxuefeng.com/books/java/quick-start/basic/index.html)
- [廖雪峰 Java：Record](https://liaoxuefeng.com/books/java/oop/core/record/index.html)
- [廖雪峰 Java：BigDecimal](https://liaoxuefeng.com/books/java/oop/core/bigdecimal/index.html)
- [廖雪峰 Java：LocalDateTime / 日期時間](https://liaoxuefeng.com/books/java/datetime/local-datetime/index.html)

---

# 14. Spring Boot 啟動與 Dependency Injection

## 14.1 `@SpringBootApplication`

```java
@SpringBootApplication
public class SampleApplication {
    public static void main(String[] args) {
        SpringApplication.run(SampleApplication.class, args);
    }
}
```

### `public static void main`

Java Application entry point。

```text
java -jar xxx.jar
       ↓
main()
       ↓
SpringApplication.run()
       ↓
Spring 建立 ApplicationContext
       ↓
建立 Bean / 啟動 Embedded Tomcat
```

### `@SpringBootApplication`

可以把它理解成 Spring Boot 應用的總入口 annotation，啟用 component scanning 與 auto configuration 等核心機制。

---

## 15. Spring Bean Stereotype

專案使用：

```java
@Service
@Repository
@Component
```

概念上都是：

> 讓 Spring 管理這個 object 的生命週期與 dependency。

### `@Service`

```java
@Service
public class ProductTradingService {
}
```

代表 Application / Business service。

### `@Repository`

```java
@Repository
public class JdbcProductTradingRepository
        implements ProductTradingRepository {
}
```

代表 persistence adapter。

### `@Component`

```java
@Component
public class AuditUserProvider {
}
```

一般 Spring-managed component。

---

# 16. Spring MVC REST Controller

## 16.1 `@RestController`

```java
@RestController
@RequestMapping("/api/products")
public class ProductTradingController {
}
```

`@RestController` 表示 method 回傳值預設序列化成 HTTP response body（通常 JSON）。

---

## 16.2 `@RequestMapping`

```java
@RequestMapping("/api/products")
```

設定 controller 共用 URL prefix。

---

## 16.3 `@GetMapping`

```java
@GetMapping
public List<ProductResponse> getProducts() {
}
```

代表：

```text
GET /api/products
```

Path variable：

```java
@GetMapping("/{prodId}")
public ProductResponse getProduct(
        @PathVariable long prodId) {
}
```

對應：

```text
GET /api/products/1
```

---

## 16.4 `@PostMapping`

```java
@PostMapping("/{prodId}/trading")
@ResponseStatus(HttpStatus.CREATED)
public TradingResponse createTrading(...) {
}
```

對應新增資源。

---

## 16.5 `@PutMapping`

```java
@PutMapping("/{prodId}")
public ProductResponse updateProduct(...) {
}
```

WUT1 Sample 用 PUT 表示更新 Product / Trading。

---

## 16.6 `@DeleteMapping`

```java
@DeleteMapping("/{prodId}/trading/{tradingId}")
@ResponseStatus(HttpStatus.NO_CONTENT)
public void deleteTrading(...) {
}
```

---

## 16.7 `@PathVariable`

```java
@PathVariable long prodId
```

從 URL path 取得值。

---

## 16.8 `@RequestBody`

```java
@RequestBody ProductUpdateRequest request
```

把 JSON request body 轉成 Java DTO。

---

## 16.9 `@RequestParam`

```java
@RequestParam long expectedRowVersion
```

從 query string 等 request parameter 取得值。

---

## 16.10 `@ResponseStatus`

```java
@ResponseStatus(HttpStatus.CREATED)
```

指定成功 response status，例如新增回 201。

### 中文延伸閱讀

- [Spring MVC 中文文件：Request Mapping](https://docs.springframework.org.cn/spring-framework/reference/web/webmvc/mvc-controller/ann-requestmapping.html)
- [Spring MVC 中文文件：RequestBody](https://docs.springframework.org.cn/spring-framework/reference/web/webmvc/mvc-controller/ann-methods/requestbody.html)

---

# 17. Bean Validation

DTO 會看到：

```java
@NotBlank
@Size(max = 100)
String prodName
```

```java
@NotNull
@DecimalMin("0.00")
BigDecimal listPrice
```

```java
@Pattern(regexp = "[A-Z]{3}")
String currencyCode
```

Controller：

```java
public ProductResponse update(
    @Valid @RequestBody ProductUpdateRequest request
) {
}
```

### Annotation 語意

| Annotation | 驗證 |
|---|---|
| `@NotNull` | 不能是 null |
| `@NotBlank` | String 不能 null/空/全空白 |
| `@Size` | String / collection 長度 |
| `@Pattern` | Regex |
| `@DecimalMin` | 數值下限 |
| `@Valid` | 要求驗證 nested/request object |
| `@Validated` | 啟用 Spring method validation 等情境 |

Validation 的價值：

> 不要讓不合法輸入一路走到 SQL 或 Business Logic 才爆炸。

### 中文延伸閱讀

- [Spring Boot 中文文件：Validation](https://docs.springframework.org.cn/spring-boot/reference/io/validation.html)

---

# 18. DTO / Command / Domain Model 為什麼不混在一起

### Request DTO

```text
HTTP JSON
 ↓
ProductUpdateRequest
```

### Command

```text
ProductUpdateRequest
 ↓ mapping
UpdateProductCommand
```

### Domain

```text
Product
Trading
ProductStatus
TradeType
```

### Response DTO

```text
Product
 ↓ mapper
ProductResponse
 ↓ JSON
Browser
```

這個教學的目的不是要求 Citizen 使用這種分層，而是讓 IT 開發理解：

> API contract、Application use case、Domain data structure 是不同責任。

---

# 19. `@Transactional`

```java
@Transactional
public Trading createTrading(...) {
    // 多個 DB operation
}
```

Transaction 的核心概念：

```text
全部成功 → COMMIT
任一步失敗 → ROLLBACK
```

教學時要連到 Business 意義，例如：

> 不要只更新 Trading 一半就留下正式狀態。

---

# 20. Repository Pattern + `JdbcClient`

Domain interface：

```java
public interface ProductTradingRepository {
    List<Product> findProducts();
}
```

Infrastructure：

```java
@Repository
public class JdbcProductTradingRepository
        implements ProductTradingRepository {

    private final JdbcClient jdbcClient;
}
```

## 20.1 Fluent API

```java
jdbcClient.sql(sql)
    .param("prodId", prodId)
    .query(this::mapProduct)
    .optional();
```

逐段：

```text
.sql(sql)             指定 SQL
.param(...)           綁定參數
.query(...)           定義 query / mapping
.optional() / list()  取得結果
```

Update：

```java
int affected = jdbcClient.sql(sql)
    .param("prodId", prodId)
    .param("rowVersion", rowVersion)
    .update();
```

### 為什麼不用字串拼 SQL？

不要：

```java
"WHERE PROD_ID = " + prodId
```

應該：

```sql
WHERE PROD_ID = :prodId
```

再 `.param()`，除了清楚，也避免 SQL injection 類型問題。

### 中文延伸閱讀

- [Spring Framework 中文文件：JdbcClient / JDBC Core](https://docs.springframework.org.cn/spring-framework/reference/data-access/jdbc/core.html)
- [廖雪峰 Java：JDBC Query](https://liaoxuefeng.com/books/java/jdbc/query/index.html)

---

# 21. ResultSet Mapping

典型概念：

```java
private Product mapProduct(ResultSet rs, int rowNum)
        throws SQLException {
    return new Product(
        rs.getLong("PROD_ID"),
        rs.getString("PROD_CODE"),
        rs.getString("PROD_NAME")
    );
}
```

需要理解：

- SQL column name 使用 DB 的全大寫 convention。
- Java domain property 保持 Java naming convention。
- Mapping 是兩個世界的邊界。

---

# 22. Error Handling

Custom exception：

```java
public class ConflictException extends RuntimeException {
}
```

Global handler：

```java
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ApiError> handleNotFound(...) {
        // ...
    }
}
```

### `@RestControllerAdvice`

把跨 Controller 的 error mapping 集中管理。

### `@ExceptionHandler`

指定哪些 exception 由哪個 method 處理。

### `ResponseEntity`

```java
return ResponseEntity
    .status(HttpStatus.NOT_FOUND)
    .body(error);
```

這是明確控制 HTTP status + body。

---

# 23. Logging / Audit

SLF4J：

```java
private static final Logger log =
    LoggerFactory.getLogger(ProductTradingService.class);
```

```java
log.info("Update product prodId={}, user={}", prodId, user);
```

不要：

```java
System.out.println(...)
```

正式 Audit 與一般 debug log 是不同概念；Sample 的 `AuditUserProvider` 是為未來 Keycloak user identity 留邊界，不代表正式 Auth 已完成。

---

# 24. `@Value` 與 application.yml

Java：

```java
@Value("${app.audit.default-user:LOCAL_DEMO}")
private String defaultUser;
```

YAML：

```yaml
app:
  audit:
    default-user: ${APP_DEFAULT_USER:LOCAL_DEMO}
```

意思：

```text
優先讀環境變數 APP_DEFAULT_USER
沒有 → LOCAL_DEMO
```

### 中文延伸閱讀

- [Spring Boot 中文文件：外部化配置](https://docs.springframework.org.cn/spring-boot/reference/features/external-config.html)

---

# 25. YAML 語法

專案：

```yaml
spring:
  application:
    name: wut1-it-app-template
  profiles:
    default: local

server:
  port: ${SERVER_PORT:8080}
  shutdown: graceful
```

重要語法：

- 縮排代表 hierarchy。
- `key: value`。
- 不使用 tab 做 indentation。
- `${ENV:default}` 是 Spring property placeholder，不是 YAML 原生功能。

List：

```yaml
include:
  - health
  - info
```

或某些 Spring property 接受逗號字串：

```yaml
include: health,info
```

---

# 26. Spring Profiles

```yaml
spring:
  profiles:
    default: local
```

Files：

```text
application.yml
application-local.yml
```

心智模型：

```text
共同設定
application.yml
      +
local 專用覆寫
application-local.yml
```

WUT1 Local profile 使用 SQLite。

---

# 27. Hikari / DataSource / SQLite URL

Local configuration 會有 JDBC URL：

```text
jdbc:sqlite:./data/wut1-sample.db
```

Spring Boot 建 DataSource，Repository 透過 JdbcClient 使用。

教學重點不是背 Hikari parameter，而是知道：

```text
Repository
 ↓
JdbcClient
 ↓
DataSource / Connection Pool
 ↓
SQLite JDBC Driver
 ↓
.db file
```

---

# 28. Spring SQL Init

Local Standalone 版本會利用 Spring SQL initialization 載入：

```text
classpath:db/CURRENT_SCHEMA.sql
classpath:db/LOCAL_SAMPLE_DATA.sql
```

這是 **Local 教學環境例外**。

正式企業 DB 原則仍是：

```text
Application 不自行 migration Production Schema
DB schema change → 人工填單 / 審核 / 執行
Repo 只保留最新版 approved CURRENT_SCHEMA.sql
```

不要把 Local initialization 誤解成 Production Flyway。

---

# 29. Spring Actuator

設定：

```yaml
management:
  endpoints:
    web:
      exposure:
        include: health,info
```

會提供例如：

```text
/actuator/health
```

用途是 Operational Health，不是 Business API。

### 中文延伸閱讀

- [Spring Boot 中文文件：Actuator Endpoints](https://docs.springframework.org.cn/spring-boot/reference/actuator/endpoints.html)

---

# 30. Spring Modulith

Package：

```java
@org.springframework.modulith.ApplicationModule
package com.example.wut1sample.producttrading;
```

Architecture test：

```java
@Test
void verifiesModuleStructure() {
    ApplicationModules.of(SampleApplication.class).verify();
}
```

目的：把「架構規範」變成 executable rule。

可以檢查：

- Module cycle。
- 不合法的跨 module internal access。
- 額外宣告的 module dependency rule。

### 中文延伸閱讀

- [Spring Modulith 繁中：驗證應用程式模組結構](https://docs.springframework.tw/spring-modulith/reference/verification.html)

---

# 31. JUnit / Spring Boot Test / AssertJ

### `@Test`

```java
@Test
void calculatesTradeAmount() {
}
```

### Spring Integration Test

```java
@SpringBootTest
@ActiveProfiles("local")
class LocalSqliteIntegrationTest {
}
```

### Injection in Test

```java
@Autowired
ProductTradingService service;
```

### AssertJ

```java
assertThat(products).hasSize(5);
assertThat(result).isEqualByComparingTo("306550.00");
```

Exception assertion：

```java
assertThatThrownBy(() -> service.update(...))
    .isInstanceOf(ConflictException.class);
```

Test 教學必須強調：

> Agent 說「完成」不是證據；可重複執行的 test 才是證據的一部分。

---

# 32. Maven POM / XML

## 32.1 XML 基礎

```xml
<project>
  <groupId>com.example</groupId>
  <artifactId>wut1-it-app-template</artifactId>
  <version>1.0.0</version>
</project>
```

XML 是 element tree。

```text
<tag>value</tag>
```

---

## 32.2 Parent

```xml
<parent>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-parent</artifactId>
  <version>4.1.1</version>
</parent>
```

從 parent 繼承 Spring Boot dependency / plugin management。

---

## 32.3 Properties

```xml
<properties>
  <java.version>25</java.version>
  <node.version>v22.16.0</node.version>
</properties>
```

引用：

```xml
<version>${some.version}</version>
```

---

## 32.4 Modules

Root POM：

```xml
<packaging>pom</packaging>
<modules>
  <module>backend</module>
</modules>
```

這表示 root 主要是 build orchestration，不產 executable application。

---

## 32.5 Dependency

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-webmvc</artifactId>
</dependency>
```

Test scope：

```xml
<scope>test</scope>
```

---

## 32.6 Plugin / Execution

Frontend Maven Plugin 概念：

```text
Maven build
 ↓
安裝 Node/npm
 ↓
npm install
 ↓
npm run build
 ↓
Vite dist/
 ↓
copy 到 Spring Boot static/
 ↓
package JAR
```

XML 會看到：

```xml
<plugin>
  <executions>
    <execution>
      <phase>generate-resources</phase>
      <goals>
        <goal>npm</goal>
      </goals>
    </execution>
  </executions>
</plugin>
```

### Maven Lifecycle

常用：

```text
clean
compile
test
package
verify
```

`mvn package` 會依 lifecycle 跑前面必要 phase，不是只執行一個孤立動作。

### 中文延伸閱讀

- [Maven 中文：Build Lifecycle](https://maven.org.cn/guides/introduction/introduction-to-the-lifecycle.html)

---

# 33. Executable JAR

Build：

```powershell
.\mvnw.cmd clean package
```

Output：

```text
backend/target/wut1-it-app-template.jar
```

Run：

```powershell
java -jar backend\target\wut1-it-app-template.jar
```

Runtime：

```text
JAR
├─ Spring Boot code
├─ Embedded Tomcat
├─ Vue / React build 後的 static files
└─ classpath SQL sample files
```

所以 Production / standalone run 不需要啟動 Vite。
