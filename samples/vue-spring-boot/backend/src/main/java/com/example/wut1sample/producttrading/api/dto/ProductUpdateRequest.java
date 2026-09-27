package com.example.wut1sample.producttrading.api.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record ProductUpdateRequest(
        @NotBlank
        @Size(max = 20)
        String prodCode,

        @NotBlank
        @Size(max = 100)
        String prodName,

        @NotBlank
        @Size(max = 30)
        String prodCategory,

        @NotBlank
        @Pattern(regexp = "ACTIVE|INACTIVE")
        String prodStatus,

        @NotBlank
        @Pattern(regexp = "[A-Z]{3}")
        String currencyCode,

        @NotNull
        @DecimalMin(value = "0.0", inclusive = true)
        BigDecimal listPrice,

        @NotNull
        LocalDate effectiveDate,

        @NotBlank
        @Size(max = 20)
        String ownerDeptCode,

        @Size(max = 500)
        String remark,

        @NotBlank
        String rowVersion
) {
}
