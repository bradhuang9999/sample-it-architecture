package com.example.wut1sample.producttrading.application;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.wut1sample.producttrading.domain.DashboardSummary;
import com.example.wut1sample.producttrading.domain.MonthlyTradingAggregate;
import com.example.wut1sample.producttrading.domain.ProductTradingAggregate;
import com.example.wut1sample.producttrading.domain.ProductTradingRepository;
import com.example.wut1sample.producttrading.domain.Trading;
import com.example.wut1sample.shared.error.NotFoundException;

@Service
public class ProductTradingDashboardService {

    private final ProductTradingRepository repository;

    public ProductTradingDashboardService(ProductTradingRepository repository) {
        this.repository = repository;
    }

    @Transactional(readOnly = true)
    public DashboardSummary getSummary() {
        return repository.loadDashboardSummary();
    }

    @Transactional(readOnly = true)
    public List<ProductTradingAggregate> getProductAggregates() {
        return repository.loadProductTradingAggregates();
    }

    @Transactional(readOnly = true)
    public List<MonthlyTradingAggregate> getMonthly(long prodId) {
        requireProduct(prodId);
        return repository.loadMonthlyTradingAggregates(prodId);
    }

    @Transactional(readOnly = true)
    public List<Trading> getDrilldownTrading(long prodId) {
        requireProduct(prodId);
        return repository.findTradingByProduct(prodId);
    }

    private void requireProduct(long prodId) {
        if (repository.findProduct(prodId).isEmpty()) {
            throw new NotFoundException("找不到 Product：" + prodId);
        }
    }
}
