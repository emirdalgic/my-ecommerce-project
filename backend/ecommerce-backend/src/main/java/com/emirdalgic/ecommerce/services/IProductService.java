package com.emirdalgic.ecommerce.services;

import com.emirdalgic.ecommerce.dto.DtoCategoryNode;
import com.emirdalgic.ecommerce.dto.DtoProduct;
import com.emirdalgic.ecommerce.dto.DtoProductIU;
import org.springframework.data.domain.Page;

import java.util.List;

public interface IProductService {
    public Page<DtoProduct> getProductsByCategory(Long categoryId, int page, int size);
    public List<DtoCategoryNode> getShowCaseProducts();
    public DtoProduct getProductById(Long id);
    public void deleteProductById(Long id);
    public DtoProduct createProduct(DtoProductIU dtoProductIU);
    public DtoProduct updateProductById(Long id, DtoProductIU dtoProductIU);
    public Page<DtoProduct> searchProducts(String query, int page, int size);
    public Page<DtoProduct> listAllProducts(int page, int size, String sortBy,String sortDir);
    public Page<DtoProduct> getFilteredProducts(String query, List<Long> categoryIds, Double minPrice, Double maxPrice, int page, int size);
}
