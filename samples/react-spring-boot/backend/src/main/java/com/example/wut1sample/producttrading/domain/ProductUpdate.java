package com.example.wut1sample.producttrading.domain;

import java.math.BigDecimal;
import java.time.LocalDate;

public record ProductUpdate(
        long prodId,
        String prodCode,
        String prodName,
        String prodCategory,
        ProductStatus prodStatus,
        String currencyCode,
        BigDecimal listPrice,
        LocalDate effectiveDate,
        String ownerDeptCode,
        String remark,
        long expectedRowVersion,
        String changedBy
) {
}
