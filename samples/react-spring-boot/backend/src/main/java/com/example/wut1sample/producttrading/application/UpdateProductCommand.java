package com.example.wut1sample.producttrading.application;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.example.wut1sample.producttrading.domain.ProductStatus;

/**
 * Product Master 更新命令。
 *
 * <p>這是 Application Layer 的輸入模型，不綁定 HTTP DTO，讓 Use Case 可被其他 Adapter 重用。</p>
 */
public record UpdateProductCommand(
        String prodCode,
        String prodName,
        String prodCategory,
        ProductStatus prodStatus,
        String currencyCode,
        BigDecimal listPrice,
        LocalDate effectiveDate,
        String ownerDeptCode,
        String remark,
        String rowVersion
) {
}
