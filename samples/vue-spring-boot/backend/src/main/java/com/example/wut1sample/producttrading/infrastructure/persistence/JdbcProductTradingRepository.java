package com.example.wut1sample.producttrading.infrastructure.persistence;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

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

@Repository
public class JdbcProductTradingRepository implements ProductTradingRepository {

    private final JdbcClient jdbcClient;

    public JdbcProductTradingRepository(JdbcClient jdbcClient) {
        this.jdbcClient = jdbcClient;
    }

    @Override
    public List<Product> findAllProducts() {
        String sql = """
                SELECT
                    PROD_ID,
                    PROD_CODE,
                    PROD_NAME,
                    PROD_CATEGORY,
                    PROD_STATUS,
                    CURRENCY_CODE,
                    LIST_PRICE,
                    EFFECTIVE_DATE,
                    OWNER_DEPT_CODE,
                    REMARK,
                    ROW_VERSION
                FROM SAMPLE_PROD
                ORDER BY PROD_CODE
                """;

        return jdbcClient.sql(sql)
                .query(this::mapProduct)
                .list();
    }

    @Override
    public Optional<Product> findProduct(long prodId) {
        String sql = """
                SELECT
                    PROD_ID,
                    PROD_CODE,
                    PROD_NAME,
                    PROD_CATEGORY,
                    PROD_STATUS,
                    CURRENCY_CODE,
                    LIST_PRICE,
                    EFFECTIVE_DATE,
                    OWNER_DEPT_CODE,
                    REMARK,
                    ROW_VERSION
                FROM SAMPLE_PROD
                WHERE PROD_ID = :prodId
                """;

        return jdbcClient.sql(sql)
                .param("prodId", prodId)
                .query(this::mapProduct)
                .optional();
    }

    @Override
    public int updateProduct(ProductUpdate update) {
        String sql = """
                UPDATE SAMPLE_PROD
                SET
                    PROD_CODE = :prodCode,
                    PROD_NAME = :prodName,
                    PROD_CATEGORY = :prodCategory,
                    PROD_STATUS = :prodStatus,
                    CURRENCY_CODE = :currencyCode,
                    LIST_PRICE = :listPrice,
                    EFFECTIVE_DATE = :effectiveDate,
                    OWNER_DEPT_CODE = :ownerDeptCode,
                    REMARK = :remark,
                    UPDATED_BY = :updatedBy,
                    UPDATED_AT = CURRENT_TIMESTAMP,
                    ROW_VERSION = ROW_VERSION + 1
                WHERE PROD_ID = :prodId
                  AND ROW_VERSION = :rowVersion
                """;

        return jdbcClient.sql(sql)
                .param("prodCode", update.prodCode())
                .param("prodName", update.prodName())
                .param("prodCategory", update.prodCategory())
                .param("prodStatus", update.prodStatus().name())
                .param("currencyCode", update.currencyCode())
                .param("listPrice", update.listPrice())
                .param("effectiveDate", update.effectiveDate().toString())
                .param("ownerDeptCode", update.ownerDeptCode())
                .param("remark", update.remark())
                .param("updatedBy", update.changedBy())
                .param("prodId", update.prodId())
                .param("rowVersion", update.expectedRowVersion())
                .update();
    }

    @Override
    public List<Trading> findTradingByProduct(long prodId) {
        String sql = """
                SELECT
                    TRADING_ID,
                    PROD_ID,
                    TRADE_DATE,
                    TRADE_TYPE,
                    COUNTERPARTY,
                    QUANTITY,
                    UNIT_PRICE,
                    TRADE_AMOUNT,
                    MARKET_CODE,
                    REMARK,
                    ROW_VERSION
                FROM SAMPLE_TRADING
                WHERE PROD_ID = :prodId
                ORDER BY TRADE_DATE DESC, TRADING_ID DESC
                """;

        return jdbcClient.sql(sql)
                .param("prodId", prodId)
                .query(this::mapTrading)
                .list();
    }

    @Override
    public Optional<Trading> findTrading(long prodId, long tradingId) {
        String sql = """
                SELECT
                    TRADING_ID,
                    PROD_ID,
                    TRADE_DATE,
                    TRADE_TYPE,
                    COUNTERPARTY,
                    QUANTITY,
                    UNIT_PRICE,
                    TRADE_AMOUNT,
                    MARKET_CODE,
                    REMARK,
                    ROW_VERSION
                FROM SAMPLE_TRADING
                WHERE PROD_ID = :prodId
                  AND TRADING_ID = :tradingId
                """;

        return jdbcClient.sql(sql)
                .param("prodId", prodId)
                .param("tradingId", tradingId)
                .query(this::mapTrading)
                .optional();
    }

    @Override
    public Trading insertTrading(long prodId, TradingChange change) {
        /*
         * SQLite 3.35+ 支援 RETURNING；可在新增後直接取得 AUTOINCREMENT ID 與 ROW_VERSION。
         * 這個 Sample 使用的 Xerial SQLite JDBC 版本支援此語法。
         */
        String sql = """
                INSERT INTO SAMPLE_TRADING
                (
                    PROD_ID,
                    TRADE_DATE,
                    TRADE_TYPE,
                    COUNTERPARTY,
                    QUANTITY,
                    UNIT_PRICE,
                    TRADE_AMOUNT,
                    MARKET_CODE,
                    REMARK,
                    CREATED_BY,
                    CREATED_AT
                )
                VALUES
                (
                    :prodId,
                    :tradeDate,
                    :tradeType,
                    :counterparty,
                    :quantity,
                    :unitPrice,
                    :tradeAmount,
                    :marketCode,
                    :remark,
                    :createdBy,
                    CURRENT_TIMESTAMP
                )
                RETURNING
                    TRADING_ID,
                    PROD_ID,
                    TRADE_DATE,
                    TRADE_TYPE,
                    COUNTERPARTY,
                    QUANTITY,
                    UNIT_PRICE,
                    TRADE_AMOUNT,
                    MARKET_CODE,
                    REMARK,
                    ROW_VERSION
                """;

        return jdbcClient.sql(sql)
                .param("prodId", prodId)
                .param("tradeDate", change.tradeDate().toString())
                .param("tradeType", change.tradeType().name())
                .param("counterparty", change.counterparty())
                .param("quantity", change.quantity())
                .param("unitPrice", change.unitPrice())
                .param("tradeAmount", change.tradeAmount())
                .param("marketCode", change.marketCode())
                .param("remark", change.remark())
                .param("createdBy", change.changedBy())
                .query(this::mapTrading)
                .single();
    }

    @Override
    public int updateTrading(long prodId, long tradingId, TradingChange change) {
        String sql = """
                UPDATE SAMPLE_TRADING
                SET
                    TRADE_DATE = :tradeDate,
                    TRADE_TYPE = :tradeType,
                    COUNTERPARTY = :counterparty,
                    QUANTITY = :quantity,
                    UNIT_PRICE = :unitPrice,
                    TRADE_AMOUNT = :tradeAmount,
                    MARKET_CODE = :marketCode,
                    REMARK = :remark,
                    UPDATED_BY = :updatedBy,
                    UPDATED_AT = CURRENT_TIMESTAMP,
                    ROW_VERSION = ROW_VERSION + 1
                WHERE PROD_ID = :prodId
                  AND TRADING_ID = :tradingId
                  AND ROW_VERSION = :rowVersion
                """;

        return jdbcClient.sql(sql)
                .param("tradeDate", change.tradeDate().toString())
                .param("tradeType", change.tradeType().name())
                .param("counterparty", change.counterparty())
                .param("quantity", change.quantity())
                .param("unitPrice", change.unitPrice())
                .param("tradeAmount", change.tradeAmount())
                .param("marketCode", change.marketCode())
                .param("remark", change.remark())
                .param("updatedBy", change.changedBy())
                .param("prodId", prodId)
                .param("tradingId", tradingId)
                .param("rowVersion", change.expectedRowVersion())
                .update();
    }

    @Override
    public int deleteTrading(long prodId, long tradingId, long expectedRowVersion) {
        String sql = """
                DELETE FROM SAMPLE_TRADING
                WHERE PROD_ID = :prodId
                  AND TRADING_ID = :tradingId
                  AND ROW_VERSION = :rowVersion
                """;

        return jdbcClient.sql(sql)
                .param("prodId", prodId)
                .param("tradingId", tradingId)
                .param("rowVersion", expectedRowVersion)
                .update();
    }

    @Override
    public DashboardSummary loadDashboardSummary() {
        String sql = """
                SELECT
                    COUNT(DISTINCT P.PROD_ID) AS PRODUCT_COUNT,
                    COUNT(T.TRADING_ID) AS TRADING_COUNT,
                    COALESCE(SUM(T.TRADE_AMOUNT), 0) AS TOTAL_TRADING_AMOUNT,
                    CASE
                        WHEN COUNT(DISTINCT P.CURRENCY_CODE) = 1
                            THEN MAX(P.CURRENCY_CODE)
                        ELSE 'MIXED'
                    END AS CURRENCY_CODE
                FROM SAMPLE_PROD P
                LEFT JOIN SAMPLE_TRADING T
                    ON T.PROD_ID = P.PROD_ID
                """;

        return jdbcClient.sql(sql)
                .query((rs, rowNum) -> new DashboardSummary(
                        rs.getLong("PRODUCT_COUNT"),
                        rs.getLong("TRADING_COUNT"),
                        rs.getBigDecimal("TOTAL_TRADING_AMOUNT"),
                        rs.getString("CURRENCY_CODE")))
                .single();
    }

    @Override
    public List<ProductTradingAggregate> loadProductTradingAggregates() {
        String sql = """
                SELECT
                    P.PROD_ID,
                    P.PROD_CODE,
                    P.PROD_NAME,
                    COUNT(T.TRADING_ID) AS TRADING_COUNT,
                    COALESCE(SUM(T.TRADE_AMOUNT), 0) AS TRADING_AMOUNT
                FROM SAMPLE_PROD P
                LEFT JOIN SAMPLE_TRADING T
                    ON T.PROD_ID = P.PROD_ID
                GROUP BY
                    P.PROD_ID,
                    P.PROD_CODE,
                    P.PROD_NAME
                ORDER BY
                    TRADING_AMOUNT DESC,
                    P.PROD_CODE
                """;

        return jdbcClient.sql(sql)
                .query((rs, rowNum) -> new ProductTradingAggregate(
                        rs.getLong("PROD_ID"),
                        rs.getString("PROD_CODE"),
                        rs.getString("PROD_NAME"),
                        rs.getLong("TRADING_COUNT"),
                        rs.getBigDecimal("TRADING_AMOUNT")))
                .list();
    }

    @Override
    public List<MonthlyTradingAggregate> loadMonthlyTradingAggregates(long prodId) {
        String sql = """
                SELECT
                    strftime('%Y-%m', TRADE_DATE) AS TRADE_MONTH,
                    COUNT(*) AS TRADING_COUNT,
                    SUM(TRADE_AMOUNT) AS TRADING_AMOUNT
                FROM SAMPLE_TRADING
                WHERE PROD_ID = :prodId
                GROUP BY strftime('%Y-%m', TRADE_DATE)
                ORDER BY TRADE_MONTH
                """;

        return jdbcClient.sql(sql)
                .param("prodId", prodId)
                .query((rs, rowNum) -> new MonthlyTradingAggregate(
                        rs.getString("TRADE_MONTH"),
                        rs.getLong("TRADING_COUNT"),
                        rs.getBigDecimal("TRADING_AMOUNT")))
                .list();
    }

    private Product mapProduct(ResultSet rs, int rowNum) throws SQLException {
        return new Product(
                rs.getLong("PROD_ID"),
                rs.getString("PROD_CODE"),
                rs.getString("PROD_NAME"),
                rs.getString("PROD_CATEGORY"),
                ProductStatus.valueOf(rs.getString("PROD_STATUS")),
                rs.getString("CURRENCY_CODE"),
                rs.getBigDecimal("LIST_PRICE"),
                LocalDate.parse(rs.getString("EFFECTIVE_DATE")),
                rs.getString("OWNER_DEPT_CODE"),
                rs.getString("REMARK"),
                rs.getLong("ROW_VERSION"));
    }

    private Trading mapTrading(ResultSet rs, int rowNum) throws SQLException {
        return new Trading(
                rs.getLong("TRADING_ID"),
                rs.getLong("PROD_ID"),
                LocalDate.parse(rs.getString("TRADE_DATE")),
                TradeType.valueOf(rs.getString("TRADE_TYPE")),
                rs.getString("COUNTERPARTY"),
                rs.getBigDecimal("QUANTITY"),
                rs.getBigDecimal("UNIT_PRICE"),
                rs.getBigDecimal("TRADE_AMOUNT"),
                rs.getString("MARKET_CODE"),
                rs.getString("REMARK"),
                rs.getLong("ROW_VERSION"));
    }
}
