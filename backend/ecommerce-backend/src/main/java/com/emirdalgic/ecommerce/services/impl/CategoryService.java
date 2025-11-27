package com.emirdalgic.ecommerce.services.impl;

import com.emirdalgic.ecommerce.repository.CategoryRepository;
import com.emirdalgic.ecommerce.services.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryService implements ICategoryService {

    @Autowired
    private CategoryRepository categoryRepository;
}
