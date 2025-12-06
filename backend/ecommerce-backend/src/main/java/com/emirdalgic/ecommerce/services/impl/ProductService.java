package com.emirdalgic.ecommerce.services.impl;

import com.emirdalgic.ecommerce.dto.*;
import com.emirdalgic.ecommerce.entities.Category;
import com.emirdalgic.ecommerce.entities.Product;
import com.emirdalgic.ecommerce.entities.ProductImage;
import com.emirdalgic.ecommerce.entities.User;
import com.emirdalgic.ecommerce.exception.BaseException;
import com.emirdalgic.ecommerce.exception.MessageType;
import com.emirdalgic.ecommerce.repository.CategoryRepository;
import com.emirdalgic.ecommerce.repository.ProductRepository;
import com.emirdalgic.ecommerce.repository.UserRepository;
import com.emirdalgic.ecommerce.services.IProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService implements IProductService {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    private DtoProduct mapToDto(Product product){
        DtoProduct dtoProduct = new DtoProduct();
        BeanUtils.copyProperties(product,dtoProduct);

        if(product.getCategory()!= null){
            DtoCategory dtoCategory = new DtoCategory();
            BeanUtils.copyProperties(product.getCategory(), dtoCategory);
            dtoProduct.setCategory(dtoCategory);
        }

        if(product.getProductImages() != null && !product.getProductImages().isEmpty()){
            List<DtoProductImage> dtoProductImages = new ArrayList<>();
            for(ProductImage productImage : product.getProductImages()){
                DtoProductImage dtoProductImage = new DtoProductImage();
                BeanUtils.copyProperties(productImage, dtoProductImage);
                dtoProductImages.add(dtoProductImage);
            }
            dtoProduct.setProductImages(dtoProductImages);
        }

        if(product.getVendor() != null){
            DtoUser dtoVendor = new DtoUser();
            BeanUtils.copyProperties(product.getVendor(), dtoVendor);
            dtoProduct.setVendor(dtoVendor);
        }
        return dtoProduct;
    }


    @Override
    public Page<DtoProduct> getProductsByCategory(Long categoryId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Product> productPage = productRepository.findAllByCategoryId(categoryId, pageable);
        return productPage.map(this::mapToDto);
    }

    @Override
    public List<DtoCategoryNode> getShowCaseProducts() {
        List<DtoCategoryNode> dtoCategoryNodes = new ArrayList<>();
        List<Category> categories = categoryRepository.findAll();

        for(Category c : categories){
            DtoCategoryNode dtoCategoryNode = new DtoCategoryNode();
            dtoCategoryNode.setCategoryName(c.getName());
            dtoCategoryNode.setCategoryId(c.getId());

            List<Product> products = productRepository.findTop12ByCategoryIdOrderByIdDesc(c.getId());
            List<DtoProduct> dtoProducts = new ArrayList<>();
            for(Product product : products){
                DtoProduct dtoProduct = mapToDto(product);
                dtoProducts.add(dtoProduct);
            }
            dtoCategoryNode.setProducts(dtoProducts);
            dtoCategoryNodes.add(dtoCategoryNode);
        }
        return dtoCategoryNodes;
    }

    @Override
    public DtoProduct getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(()-> new BaseException(MessageType.NO_RECORD_EXIST));
        return mapToDto(product);
    }

    @Override
    public void deleteProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(()->new BaseException(MessageType.NO_RECORD_EXIST));
        productRepository.deleteById(id);
    }

    @Override
    public DtoProduct createProduct(DtoProductIU dtoProductIU) {
        Product product = new Product();
        BeanUtils.copyProperties(dtoProductIU, product);

        Category category = categoryRepository.findById(dtoProductIU.getCategoryId())
                .orElseThrow(()-> new BaseException(MessageType.NO_RECORD_EXIST));

        product.setCategory(category);

        User vendor = userRepository.findById(1L)
                .orElseThrow(() -> new BaseException(MessageType.NO_RECORD_EXIST));

        product.setVendor(vendor);

        if(dtoProductIU.getProductImages() != null && !dtoProductIU.getProductImages().isEmpty()){
            List<ProductImage> productImages = new ArrayList<>();
            for(String imUrl : dtoProductIU.getProductImages()){
                ProductImage image = new ProductImage();
                image.setImageUrl(imUrl);
                image.setProduct(product);
                productImages.add(image);
            }
            product.setProductImages(productImages);
        }

        Product dbProduct = productRepository.save(product);
        return mapToDto(dbProduct);
    }

    @Override
    public DtoProduct updateProductById(Long id, DtoProductIU dtoProductIU) {
        Product product = productRepository.findById(id)
                .orElseThrow(()->new BaseException(MessageType.NO_RECORD_EXIST));

        if(dtoProductIU.getCategoryId() != null){
            Category category = categoryRepository.findById(dtoProductIU.getCategoryId())
                    .orElseThrow(()-> new BaseException(MessageType.NO_RECORD_EXIST));
            product.setCategory(category);

        }
        product.setName(dtoProductIU.getName());
        product.setDescription(dtoProductIU.getDescription());
        product.setPrice(dtoProductIU.getPrice());
        product.setStockAmount(dtoProductIU.getStockAmount());

        Product updatedProduct = productRepository.save(product);
        return mapToDto(updatedProduct);
    }

    @Override
    public Page<DtoProduct> searchProducts(String query, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Product> productPage = productRepository.findByNameContainingIgnoreCase(query, pageable);

        List<DtoProduct> dtoProducts = new ArrayList<>();
        for(Product product : productPage.getContent()){
            DtoProduct dtoProduct = new DtoProduct();
            dtoProduct = mapToDto(product);
            dtoProducts.add(dtoProduct);
        }
        return new PageImpl<>(dtoProducts, pageable, productPage.getTotalElements());
    }

    @Override
    public Page<DtoProduct> listAllProducts(int page, int size, String sortBy,String sortDir) {
        Sort.Direction direction;
        if(sortDir.equalsIgnoreCase("asc")){
            direction = Sort.Direction.ASC;
        }else{
            direction = Sort.Direction.DESC;
        }
        Pageable pageable = PageRequest.of(page,size, Sort.by(direction, sortBy));
        Page<Product> productPage = productRepository.findAll(pageable);
        return productPage.map(this::mapToDto);
    }

    @Override
    public Page<DtoProduct> getFilteredProducts(String query, List<Long> categoryIds, Double minPrice, Double maxPrice, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Product> productPage = productRepository.findFilteredProducts(query, categoryIds, minPrice, maxPrice, pageable);

        return productPage.map(this::mapToDto);
    }

}
