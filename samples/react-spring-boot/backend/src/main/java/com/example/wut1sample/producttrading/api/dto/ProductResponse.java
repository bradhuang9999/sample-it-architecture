package com.example.wut1sample.producttrading.api.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public record ProductResponse(
        long prodId,
        String prodCode,
        String prodName,
        String prodCategory,
        String prodStatus,
        String currencyCode,
        BigDecimal listPrice,
        LocalDate effectiveDate,
        String ownerDeptCode,
        String remark,
        String rowVersion
) {
}
