package com.example.wut1sample.producttrading.api;

import com.example.wut1sample.producttrading.api.dto.ProductResponse;
import com.example.wut1sample.producttrading.api.dto.ProductSummaryResponse;
import com.example.wut1sample.producttrading.api.dto.ProductUpdateRequest;
import com.example.wut1sample.producttrading.api.dto.TradingResponse;
import com.example.wut1sample.producttrading.api.dto.TradingUpsertRequest;
import com.example.wut1sample.producttrading.application.RowVersionCodec;
import com.example.wut1sample.producttrading.application.UpdateProductCommand;
import com.example.wut1sample.producttrading.application.UpsertTradingCommand;
import com.example.wut1sample.producttrading.domain.Product;
import com.example.wut1sample.producttrading.domain.ProductStatus;
import com.example.wut1sample.producttrading.domain.TradeType;
import com.example.wut1sample.producttrading.domain.Trading;

/**
 * HTTP DTO 與 Application / Domain Model 的邊界 Mapper。
 *
 * <p>Controller 不承擔 Business Rule；Mapper 只做格式與型別轉換。</p>
 */
final class ProductTradingApiMapper {

    private ProductTradingApiMapper() {
    }

    static ProductSummaryResponse toSummaryResponse(Product product) {
        return new ProductSummaryResponse(
                product.prodId(),
                product.prodCode(),
                product.prodName(),
                product.prodStatus().name());
    }

    static ProductResponse toResponse(Product product) {
        return new ProductResponse(
                product.prodId(),
                product.prodCode(),
                product.prodName(),
                product.prodCategory(),
                product.prodStatus().name(),
                product.currencyCode(),
                product.listPrice(),
                product.effectiveDate(),
                product.ownerDeptCode(),
                product.remark(),
                RowVersionCodec.encode(product.rowVersion()));
    }

    static TradingResponse toResponse(Trading trading) {
        return new TradingResponse(
                trading.tradingId(),
                trading.prodId(),
                trading.tradeDate(),
                trading.tradeType().name(),
                trading.counterparty(),
                trading.quantity(),
                trading.unitPrice(),
                trading.tradeAmount(),
                trading.marketCode(),
                trading.remark(),
                RowVersionCodec.encode(trading.rowVersion()));
    }

    static UpdateProductCommand toCommand(ProductUpdateRequest request) {
        return new UpdateProductCommand(
                request.prodCode().trim(),
                request.prodName().trim(),
                request.prodCategory().trim(),
                ProductStatus.valueOf(request.prodStatus()),
                request.currencyCode().trim(),
                request.listPrice(),
                request.effectiveDate(),
                request.ownerDeptCode().trim(),
                normalizeNullable(request.remark()),
                request.rowVersion());
    }

    static UpsertTradingCommand toCommand(TradingUpsertRequest request) {
        return new UpsertTradingCommand(
                request.tradeDate(),
                TradeType.valueOf(request.tradeType()),
                request.counterparty().trim(),
                request.quantity(),
                request.unitPrice(),
                normalizeNullable(request.marketCode()),
                normalizeNullable(request.remark()),
                request.rowVersion());
    }

    private static String normalizeNullable(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }
        return value.trim();
    }
}
