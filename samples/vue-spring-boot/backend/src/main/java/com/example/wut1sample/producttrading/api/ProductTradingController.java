package com.example.wut1sample.producttrading.api;

import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;

import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.example.wut1sample.producttrading.api.dto.ProductResponse;
import com.example.wut1sample.producttrading.api.dto.ProductSummaryResponse;
import com.example.wut1sample.producttrading.api.dto.ProductUpdateRequest;
import com.example.wut1sample.producttrading.api.dto.TradingResponse;
import com.example.wut1sample.producttrading.api.dto.TradingUpsertRequest;
import com.example.wut1sample.producttrading.application.ProductTradingService;

@Validated
@RestController
@RequestMapping("/api/products")
public class ProductTradingController {

    private final ProductTradingService service;

    public ProductTradingController(ProductTradingService service) {
        this.service = service;
    }

    @GetMapping
    public List<ProductSummaryResponse> getProducts() {
        return service.getProducts().stream()
                .map(ProductTradingApiMapper::toSummaryResponse)
                .toList();
    }

    @GetMapping("/{prodId}")
    public ProductResponse getProduct(@PathVariable long prodId) {
        return ProductTradingApiMapper.toResponse(service.getProduct(prodId));
    }

    @PutMapping("/{prodId}")
    public ProductResponse updateProduct(
            @PathVariable long prodId,
            @Valid @RequestBody ProductUpdateRequest request) {
        return ProductTradingApiMapper.toResponse(
                service.updateProduct(prodId, ProductTradingApiMapper.toCommand(request)));
    }

    @GetMapping("/{prodId}/trades")
    public List<TradingResponse> getTrading(@PathVariable long prodId) {
        return service.getTrading(prodId).stream()
                .map(ProductTradingApiMapper::toResponse)
                .toList();
    }

    @PostMapping("/{prodId}/trades")
    @ResponseStatus(HttpStatus.CREATED)
    public TradingResponse createTrading(
            @PathVariable long prodId,
            @Valid @RequestBody TradingUpsertRequest request) {
        return ProductTradingApiMapper.toResponse(
                service.createTrading(prodId, ProductTradingApiMapper.toCommand(request)));
    }

    @PutMapping("/{prodId}/trades/{tradingId}")
    public TradingResponse updateTrading(
            @PathVariable long prodId,
            @PathVariable long tradingId,
            @Valid @RequestBody TradingUpsertRequest request) {
        return ProductTradingApiMapper.toResponse(
                service.updateTrading(
                        prodId,
                        tradingId,
                        ProductTradingApiMapper.toCommand(request)));
    }

    @DeleteMapping("/{prodId}/trades/{tradingId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteTrading(
            @PathVariable long prodId,
            @PathVariable long tradingId,
            @RequestParam @NotBlank String rowVersion) {
        service.deleteTrading(prodId, tradingId, rowVersion);
    }
}
