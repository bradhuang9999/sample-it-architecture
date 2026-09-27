package com.example.wut1sample.producttrading.application;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.example.wut1sample.producttrading.domain.TradeType;

/**
 * Trading 新增 / 修改命令。
 *
 * <p>TRADE_AMOUNT 不在命令中，因為正式金額必須由 Backend Business Rule 計算。</p>
 */
public record UpsertTradingCommand(
        LocalDate tradeDate,
        TradeType tradeType,
        String counterparty,
        BigDecimal quantity,
        BigDecimal unitPrice,
        String marketCode,
        String remark,
        String rowVersion
) {
}
