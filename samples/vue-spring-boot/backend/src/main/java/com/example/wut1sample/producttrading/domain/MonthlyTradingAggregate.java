package com.example.wut1sample.producttrading.domain;

import java.math.BigDecimal;

public record MonthlyTradingAggregate(
        String month,
        long tradingCount,
        BigDecimal tradingAmount
) {
}
