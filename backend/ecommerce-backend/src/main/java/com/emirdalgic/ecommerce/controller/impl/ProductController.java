package com.emirdalgic.ecommerce.controller.impl;

import com.emirdalgic.ecommerce.controller.IProductController;
import com.emirdalgic.ecommerce.dto.DtoCategoryNode;
import com.emirdalgic.ecommerce.dto.DtoProduct;
import com.emirdalgic.ecommerce.dto.DtoProductIU;
import com.emirdalgic.ecommerce.entities.Product;
import com.emirdalgic.ecommerce.services.IProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("api/products")
@RequiredArgsConstructor
public class ProductController implements IProductController {
    private final IProductService productService;

    @GetMapping(path = "/category/{categoryId}")
    @Override
    public ResponseEntity<Page<DtoProduct>> getProductsByCategory(@PathVariable(name = "categoryId") Long categoryId,
                                                                  @RequestParam(defaultValue = "0") int page,
                                                                  @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(productService.getProductsByCategory(categoryId,page,size));
    }

    @GetMapping(path = "/show-case")
    @Override
    public List<DtoCategoryNode> getShowCaseProducts() {
        return productService.getShowCaseProducts();
    }

    @GetMapping(path = "/{id}")
    @Override
    public ResponseEntity<DtoProduct> getProductById(@PathVariable Long id) {
        DtoProduct product = productService.getProductById(id);
        return ResponseEntity.ok(product);
    }

    @DeleteMapping(path = "/delete/{id}")
    @Override
    public ResponseEntity<Void> deleteProductById(@PathVariable Long id) {
        productService.deleteProductById(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping(path = "/save")
    @Override
    public ResponseEntity<DtoProduct> createProduct(@RequestBody DtoProductIU dtoProductIU) {
        DtoProduct savedProduct = productService.createProduct(dtoProductIU);
        return  ResponseEntity.status(HttpStatus.CREATED).body(savedProduct);
    }

    @PutMapping(path = "/update/{id}")
    @Override
    public ResponseEntity<DtoProduct> updateProductById(@PathVariable(name = "id") Long id,
                                                        @RequestBody DtoProductIU dtoProductIU) {
        DtoProduct updatedProduct = productService.updateProductById(id, dtoProductIU);
        return ResponseEntity.ok(updatedProduct); //burada nasıl bir status kod gönderceğimi bilemedim o yüzden ok gönderdim
    }

    @GetMapping(path = "/search")
    @Override
    public ResponseEntity<Page<DtoProduct>> searchProducts(@RequestParam String query,
                                                           @RequestParam(defaultValue = "0") int page,
                                                           @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(productService.searchProducts(query,page,size));
    }
}
