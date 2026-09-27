package com.example.wut1sample.producttrading;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;

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

    @Autowired
    LocalSqliteIntegrationTest(ProductTradingRepository repository) {
        this.repository = repository;
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
}
