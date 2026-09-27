package com.example.wut1sample.producttrading.domain;

import java.math.BigDecimal;

public record ProductTradingAggregate(
        long prodId,
        String prodCode,
        String prodName,
        long tradingCount,
        BigDecimal tradingAmount
) {
}
