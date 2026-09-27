package com.example.wut1sample.producttrading;

import static org.assertj.core.api.Assertions.assertThat;

import java.math.BigDecimal;
import java.time.LocalDate;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;
import org.springframework.transaction.annotation.Transactional;

import com.example.wut1sample.producttrading.application.ProductTradingService;
import com.example.wut1sample.producttrading.application.UpdateProductCommand;
import com.example.wut1sample.producttrading.application.UpsertTradingCommand;
import com.example.wut1sample.producttrading.domain.TradeType;
import com.example.wut1sample.producttrading.domain.ProductTradingRepository;

/**
 * 驗證 Local SQLite 可以在沒有外部 Database Server 的情況下建立 Schema、載入 Sample Data 並執行查詢。
 *
 * <p>這個測試刻意使用 target/ 下的 SQLite File；`mvn clean` 後會重新建立，
 * 不污染 Repository 的 data/ runtime DB。</p>
 */
@SpringBootTest
@ActiveProfiles("local")
@TestPropertySource(properties = {
        "spring.datasource.url=jdbc:sqlite:target/test-wut1.db?foreign_keys=on&busy_timeout=5000",
        "spring.datasource.hikari.maximum-pool-size=1",
        "spring.datasource.hikari.minimum-idle=1"
})
class LocalSqliteIntegrationTest {

    private final ProductTradingRepository repository;
    private final ProductTradingService service;

    @Autowired
    LocalSqliteIntegrationTest(ProductTradingRepository repository, ProductTradingService service) {
        this.repository = repository;
        this.service = service;
    }

    @Test
    void localSqliteShouldLoadSampleDataAndDashboardAggregates() {
        assertThat(repository.findAllProducts()).hasSize(5);
        assertThat(repository.findTradingByProduct(1001L)).hasSize(4);

        var dashboard = repository.loadDashboardSummary();
        assertThat(dashboard.productCount()).isEqualTo(5);
        assertThat(dashboard.tradingCount()).isEqualTo(18);
        assertThat(dashboard.totalTradingAmount()).isEqualByComparingTo("306550.00");
        assertThat(dashboard.currencyCode()).isEqualTo("TWD");

        assertThat(repository.loadMonthlyTradingAggregates(1001L))
                .extracting(item -> item.month())
                .containsExactly("2026-01", "2026-02", "2026-03", "2026-04");
    }

    @Test
    @Transactional
    void localSqliteShouldSupportProductAndTradingWrites() {
        var product = service.getProduct(1001L);
        var updatedProduct = service.updateProduct(1001L, new UpdateProductCommand(
                product.prodCode(),
                "SQLite Integration",
                product.prodCategory(),
                product.prodStatus(),
                product.currencyCode(),
                product.listPrice(),
                product.effectiveDate(),
                product.ownerDeptCode(),
                product.remark(),
                Long.toString(product.rowVersion())));
        assertThat(updatedProduct.rowVersion()).isEqualTo(product.rowVersion() + 1);

        var created = service.createTrading(1001L, new UpsertTradingCommand(
                LocalDate.of(2026, 5, 1), TradeType.BUY, "SQLite Test",
                new BigDecimal("2.5"), new BigDecimal("40.2"), "TPE", null, null));
        assertThat(created.tradeAmount()).isEqualByComparingTo("100.50");

        var changed = service.updateTrading(1001L, created.tradingId(), new UpsertTradingCommand(
                created.tradeDate(), created.tradeType(), created.counterparty(),
                new BigDecimal("3"), new BigDecimal("40"), created.marketCode(),
                created.remark(), Long.toString(created.rowVersion())));
        assertThat(changed.tradeAmount()).isEqualByComparingTo("120.00");
        assertThat(changed.rowVersion()).isEqualTo(created.rowVersion() + 1);

        service.deleteTrading(1001L, created.tradingId(), Long.toString(changed.rowVersion()));
        assertThat(repository.findTrading(1001L, created.tradingId())).isEmpty();
    }
}
