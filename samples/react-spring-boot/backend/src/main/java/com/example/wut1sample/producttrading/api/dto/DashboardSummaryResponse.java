package com.example.wut1sample.producttrading.api.dto;

import java.math.BigDecimal;

public record DashboardSummaryResponse(
        long productCount,
        long tradingCount,
        BigDecimal totalTradingAmount,
        String currencyCode
) {
}
