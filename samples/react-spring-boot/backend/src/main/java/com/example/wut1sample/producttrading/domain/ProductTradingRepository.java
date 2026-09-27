package com.example.wut1sample.producttrading.domain;

import java.util.List;
import java.util.Optional;

public interface ProductTradingRepository {

    List<Product> findAllProducts();

    Optional<Product> findProduct(long prodId);

    int updateProduct(ProductUpdate update);

    List<Trading> findTradingByProduct(long prodId);

    Optional<Trading> findTrading(long prodId, long tradingId);

    Trading insertTrading(long prodId, TradingChange change);

    int updateTrading(long prodId, long tradingId, TradingChange change);

    int deleteTrading(long prodId, long tradingId, long expectedRowVersion);

    DashboardSummary loadDashboardSummary();

    List<ProductTradingAggregate> loadProductTradingAggregates();

    List<MonthlyTradingAggregate> loadMonthlyTradingAggregates(long prodId);
}
