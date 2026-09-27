package com.example.wut1sample.producttrading.api.dto;

public record ProductSummaryResponse(
        long prodId,
        String prodCode,
        String prodName,
        String prodStatus
) {
}
