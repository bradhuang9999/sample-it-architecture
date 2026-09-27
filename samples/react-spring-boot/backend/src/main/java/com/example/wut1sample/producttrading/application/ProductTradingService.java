package com.example.wut1sample.producttrading.application;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.wut1sample.producttrading.domain.Product;
import com.example.wut1sample.producttrading.domain.ProductTradingRepository;
import com.example.wut1sample.producttrading.domain.ProductUpdate;
import com.example.wut1sample.producttrading.domain.Trading;
import com.example.wut1sample.producttrading.domain.TradingChange;
import com.example.wut1sample.shared.audit.AuditUserProvider;
import com.example.wut1sample.shared.error.ConflictException;
import com.example.wut1sample.shared.error.NotFoundException;

@Service
public class ProductTradingService {

    private final ProductTradingRepository repository;
    private final AuditUserProvider auditUserProvider;

    public ProductTradingService(
            ProductTradingRepository repository,
            AuditUserProvider auditUserProvider) {
        this.repository = repository;
        this.auditUserProvider = auditUserProvider;
    }

    @Transactional(readOnly = true)
    public List<Product> getProducts() {
        return repository.findAllProducts();
    }

    @Transactional(readOnly = true)
    public Product getProduct(long prodId) {
        return requireProduct(prodId);
    }

    @Transactional
    public Product updateProduct(long prodId, UpdateProductCommand command) {
        // 先區分「不存在」與「ROW_VERSION 過期」，讓 API 回應能正確對應 404 / 409。
        requireProduct(prodId);

        ProductUpdate update = new ProductUpdate(
                prodId,
                command.prodCode(),
                command.prodName(),
                command.prodCategory(),
                command.prodStatus(),
                command.currencyCode(),
                command.listPrice(),
                command.effectiveDate(),
                command.ownerDeptCode(),
                command.remark(),
                RowVersionCodec.decode(command.rowVersion()),
                auditUserProvider.currentUser());

        if (repository.updateProduct(update) == 0) {
            // ROW_VERSION 不符時不會更新任何 Row。
            // 不做 last-write-wins，要求使用者重新讀取後再決定是否覆寫。
            throw new ConflictException("Product 已被其他使用者修改，請重新整理資料後再試。");
        }

        return requireProduct(prodId);
    }

    @Transactional(readOnly = true)
    public List<Trading> getTrading(long prodId) {
        requireProduct(prodId);
        return repository.findTradingByProduct(prodId);
    }

    @Transactional
    public Trading createTrading(long prodId, UpsertTradingCommand command) {
        requireProduct(prodId);
        return repository.insertTrading(prodId, toTradingChange(command, null));
    }

    @Transactional
    public Trading updateTrading(
            long prodId,
            long tradingId,
            UpsertTradingCommand command) {

        requireTrading(prodId, tradingId);

        if (command.rowVersion() == null || command.rowVersion().isBlank()) {
            throw new ConflictException("更新 Trading 時必須提供 ROW_VERSION。");
        }

        TradingChange change = toTradingChange(
                command,
                RowVersionCodec.decode(command.rowVersion()));

        if (repository.updateTrading(prodId, tradingId, change) == 0) {
            throw new ConflictException("Trading 已被其他使用者修改，請重新整理資料後再試。");
        }

        return requireTrading(prodId, tradingId);
    }

    @Transactional
    public void deleteTrading(long prodId, long tradingId, String rowVersion) {
        requireTrading(prodId, tradingId);

        if (repository.deleteTrading(
                prodId,
                tradingId,
                RowVersionCodec.decode(rowVersion)) == 0) {
            throw new ConflictException("Trading 已被其他使用者修改，請重新整理資料後再試。");
        }
    }

    private Product requireProduct(long prodId) {
        return repository.findProduct(prodId)
                .orElseThrow(() -> new NotFoundException("找不到 Product：" + prodId));
    }

    private Trading requireTrading(long prodId, long tradingId) {
        return repository.findTrading(prodId, tradingId)
                .orElseThrow(() -> new NotFoundException("找不到 Trading：" + tradingId));
    }

    private TradingChange toTradingChange(
            UpsertTradingCommand command,
            Long expectedRowVersion) {

        /*
         * 正式 Business Rule：
         * TRADE_AMOUNT 一律由 Backend 計算。
         * Frontend 只送 QUANTITY / UNIT_PRICE，避免 Client 自行計算造成不同結果。
         */
        BigDecimal tradeAmount = command.quantity()
                .multiply(command.unitPrice())
                .setScale(2, RoundingMode.HALF_UP);

        return new TradingChange(
                command.tradeDate(),
                command.tradeType(),
                command.counterparty(),
                command.quantity(),
                command.unitPrice(),
                tradeAmount,
                command.marketCode(),
                command.remark(),
                expectedRowVersion,
                auditUserProvider.currentUser());
    }
}
