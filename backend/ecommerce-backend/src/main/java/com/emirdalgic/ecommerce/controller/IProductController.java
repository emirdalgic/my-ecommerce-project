package com.emirdalgic.ecommerce.controller;

import com.emirdalgic.ecommerce.dto.DtoCategoryNode;
import com.emirdalgic.ecommerce.dto.DtoProduct;
import com.emirdalgic.ecommerce.dto.DtoProductIU;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface IProductController {
    public ResponseEntity<Page<DtoProduct>> getProductsByCategory(Long categoryId, int page, int size);
    public List<DtoCategoryNode> getShowCaseProducts();
    public ResponseEntity<DtoProduct> getProductById(Long id);
    public ResponseEntity<Void> deleteProductById(Long id);
    public ResponseEntity<DtoProduct> createProduct(DtoProductIU dtoProductIU);
    public ResponseEntity<DtoProduct> updateProductById(Long id, DtoProductIU dtoProductIU);
    public ResponseEntity<Page<DtoProduct>> searchProducts(String query, int page, int size);
    public ResponseEntity<Page<DtoProduct>> listAllProducts(int page, int size, String sortBy,String sortDir);
    public ResponseEntity<Page<DtoProduct>> getFilteredProducts(int page, int size, String query, List<Long> categoryIds, Double minPrice, Double maxPrice);
}
