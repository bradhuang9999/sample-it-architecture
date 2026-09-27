package com.example.wut1sample.producttrading.api.dto;

import java.math.BigDecimal;

public record ProductTradingAggregateResponse(
        long prodId,
        String prodCode,
        String prodName,
        long tradingCount,
        BigDecimal tradingAmount
) {
}
