package com.example.wut1sample.producttrading.domain;

import java.math.BigDecimal;

public record DashboardSummary(
        long productCount,
        long tradingCount,
        BigDecimal totalTradingAmount,
        String currencyCode
) {
}
