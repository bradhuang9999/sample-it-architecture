package com.example.wut1sample.producttrading.api.dto;

import java.math.BigDecimal;

public record MonthlyTradingResponse(
        String month,
        long tradingCount,
        BigDecimal tradingAmount
) {
}
