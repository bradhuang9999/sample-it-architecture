package com.example.wut1sample.producttrading.api.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public record TradingResponse(
        long tradingId,
        long prodId,
        LocalDate tradeDate,
        String tradeType,
        String counterparty,
        BigDecimal quantity,
        BigDecimal unitPrice,
        BigDecimal tradeAmount,
        String marketCode,
        String remark,
        String rowVersion
) {
}
