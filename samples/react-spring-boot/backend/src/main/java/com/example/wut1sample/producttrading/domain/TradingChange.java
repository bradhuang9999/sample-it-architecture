package com.example.wut1sample.producttrading.domain;

import java.math.BigDecimal;
import java.time.LocalDate;

public record TradingChange(
        LocalDate tradeDate,
        TradeType tradeType,
        String counterparty,
        BigDecimal quantity,
        BigDecimal unitPrice,
        BigDecimal tradeAmount,
        String marketCode,
        String remark,
        Long expectedRowVersion,
        String changedBy
) {
}
