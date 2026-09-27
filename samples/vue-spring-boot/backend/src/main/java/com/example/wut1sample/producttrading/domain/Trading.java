package com.example.wut1sample.producttrading.domain;

import java.math.BigDecimal;
import java.time.LocalDate;

public record Trading(
        long tradingId,
        long prodId,
        LocalDate tradeDate,
        TradeType tradeType,
        String counterparty,
        BigDecimal quantity,
        BigDecimal unitPrice,
        BigDecimal tradeAmount,
        String marketCode,
        String remark,
        long rowVersion
) {
}
