package com.example.wut1sample.producttrading.api.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record TradingUpsertRequest(
        @NotNull
        LocalDate tradeDate,

        @NotBlank
        @Pattern(regexp = "BUY|SELL")
        String tradeType,

        @NotBlank
        @Size(max = 100)
        String counterparty,

        @NotNull
        @DecimalMin(value = "0.0001")
        BigDecimal quantity,

        @NotNull
        @DecimalMin(value = "0.0", inclusive = true)
        BigDecimal unitPrice,

        @Size(max = 20)
        String marketCode,

        @Size(max = 500)
        String remark,

        String rowVersion
) {
}
