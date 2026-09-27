package com.example.wut1sample.producttrading.api;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.wut1sample.producttrading.api.dto.DashboardSummaryResponse;
import com.example.wut1sample.producttrading.api.dto.MonthlyTradingResponse;
import com.example.wut1sample.producttrading.api.dto.ProductTradingAggregateResponse;
import com.example.wut1sample.producttrading.api.dto.TradingResponse;
import com.example.wut1sample.producttrading.application.ProductTradingDashboardService;

@RestController
@RequestMapping("/api/dashboard")
public class ProductTradingDashboardController {

    private final ProductTradingDashboardService service;

    public ProductTradingDashboardController(ProductTradingDashboardService service) {
        this.service = service;
    }

    @GetMapping("/summary")
    public DashboardSummaryResponse getSummary() {
        var summary = service.getSummary();
        return new DashboardSummaryResponse(
                summary.productCount(),
                summary.tradingCount(),
                summary.totalTradingAmount(),
                summary.currencyCode());
    }

    @GetMapping("/products")
    public List<ProductTradingAggregateResponse> getProductAggregates() {
        return service.getProductAggregates().stream()
                .map(item -> new ProductTradingAggregateResponse(
                        item.prodId(),
                        item.prodCode(),
                        item.prodName(),
                        item.tradingCount(),
                        item.tradingAmount()))
                .toList();
    }

    @GetMapping("/products/{prodId}/monthly")
    public List<MonthlyTradingResponse> getMonthly(@PathVariable long prodId) {
        return service.getMonthly(prodId).stream()
                .map(item -> new MonthlyTradingResponse(
                        item.month(),
                        item.tradingCount(),
                        item.tradingAmount()))
                .toList();
    }

    @GetMapping("/products/{prodId}/trades")
    public List<TradingResponse> getDrilldownTrading(@PathVariable long prodId) {
        return service.getDrilldownTrading(prodId).stream()
                .map(ProductTradingApiMapper::toResponse)
                .toList();
    }
}
