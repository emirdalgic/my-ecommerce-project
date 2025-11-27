package com.emirdalgic.ecommerce.services.impl;

import com.emirdalgic.ecommerce.repository.ProductRepository;
import com.emirdalgic.ecommerce.services.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductService implements IProductService {
    @Autowired
    private ProductRepository productRepository;
}
