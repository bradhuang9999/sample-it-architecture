package com.example.wut1sample.producttrading;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;

import com.example.wut1sample.producttrading.application.ProductTradingService;
import com.example.wut1sample.producttrading.application.UpsertTradingCommand;
import com.example.wut1sample.producttrading.domain.DashboardSummary;
import com.example.wut1sample.producttrading.domain.MonthlyTradingAggregate;
import com.example.wut1sample.producttrading.domain.Product;
import com.example.wut1sample.producttrading.domain.ProductStatus;
import com.example.wut1sample.producttrading.domain.ProductTradingAggregate;
import com.example.wut1sample.producttrading.domain.ProductTradingRepository;
import com.example.wut1sample.producttrading.domain.ProductUpdate;
import com.example.wut1sample.producttrading.domain.TradeType;
import com.example.wut1sample.producttrading.domain.Trading;
import com.example.wut1sample.producttrading.domain.TradingChange;
import com.example.wut1sample.shared.audit.AuditUserProvider;
import com.example.wut1sample.shared.error.ConflictException;

class ProductTradingServiceTest {

    @Test
    void backendShouldCalculateTradeAmount() {
        FakeRepository repository = new FakeRepository();
        ProductTradingService service = new ProductTradingService(
                repository,
                new AuditUserProvider("TEST_USER"));

        UpsertTradingCommand request = new UpsertTradingCommand(
                LocalDate.of(2026, 9, 1),
                TradeType.BUY,
                "Counterparty",
                new BigDecimal("3.5000"),
                new BigDecimal("123.4567"),
                "TPE",
                null,
                null);

        var response = service.createTrading(1001L, request);

        assertThat(repository.lastTradingChange.tradeAmount())
                .isEqualByComparingTo("432.10");
        assertThat(response.tradeAmount())
                .isEqualByComparingTo("432.10");
    }

    @Test
    void staleRowVersionShouldReturnConflictInsteadOfSilentOverwrite() {
        FakeRepository repository = new FakeRepository();
        repository.updateTradingResult = 0;

        ProductTradingService service = new ProductTradingService(
                repository,
                new AuditUserProvider("TEST_USER"));

        String rowVersion = "1";

        UpsertTradingCommand request = new UpsertTradingCommand(
                LocalDate.of(2026, 9, 1),
                TradeType.BUY,
                "Counterparty",
                new BigDecimal("1"),
                new BigDecimal("100"),
                "TPE",
                null,
                rowVersion);

        assertThatThrownBy(() -> service.updateTrading(1001L, 20001L, request))
                .isInstanceOf(ConflictException.class)
                .hasMessageContaining("其他使用者修改");
    }

    private static final class FakeRepository implements ProductTradingRepository {

        private final long rowVersion = 1L;
        private TradingChange lastTradingChange;
        private int updateTradingResult = 1;

        @Override
        public List<Product> findAllProducts() {
            return List.of(product());
        }

        @Override
        public Optional<Product> findProduct(long prodId) {
            return prodId == 1001L ? Optional.of(product()) : Optional.empty();
        }

        @Override
        public int updateProduct(ProductUpdate update) {
            return 1;
        }

        @Override
        public List<Trading> findTradingByProduct(long prodId) {
            return new ArrayList<>();
        }

        @Override
        public Optional<Trading> findTrading(long prodId, long tradingId) {
            if (prodId == 1001L && tradingId == 20001L) {
                return Optional.of(trading(
                        tradingId,
                        new BigDecimal("1"),
                        new BigDecimal("100"),
                        new BigDecimal("100")));
            }
            return Optional.empty();
        }

        @Override
        public Trading insertTrading(long prodId, TradingChange change) {
            this.lastTradingChange = change;
            return trading(
                    20099L,
                    change.quantity(),
                    change.unitPrice(),
                    change.tradeAmount());
        }

        @Override
        public int updateTrading(long prodId, long tradingId, TradingChange change) {
            this.lastTradingChange = change;
            return updateTradingResult;
        }

        @Override
        public int deleteTrading(long prodId, long tradingId, long expectedRowVersion) {
            return 1;
        }

        @Override
        public DashboardSummary loadDashboardSummary() {
            return new DashboardSummary(1, 1, new BigDecimal("100"), "TWD");
        }

        @Override
        public List<ProductTradingAggregate> loadProductTradingAggregates() {
            return List.of();
        }

        @Override
        public List<MonthlyTradingAggregate> loadMonthlyTradingAggregates(long prodId) {
            return List.of();
        }

        private Product product() {
            return new Product(
                    1001L,
                    "P001",
                    "Alpha Product",
                    "STANDARD",
                    ProductStatus.ACTIVE,
                    "TWD",
                    new BigDecimal("1200"),
                    LocalDate.of(2026, 1, 1),
                    "D100",
                    null,
                    rowVersion);
        }

        private Trading trading(
                long tradingId,
                BigDecimal quantity,
                BigDecimal unitPrice,
                BigDecimal amount) {
            return new Trading(
                    tradingId,
                    1001L,
                    LocalDate.of(2026, 9, 1),
                    TradeType.BUY,
                    "Counterparty",
                    quantity,
                    unitPrice,
                    amount,
                    "TPE",
                    null,
                    rowVersion);
        }
    }
}
