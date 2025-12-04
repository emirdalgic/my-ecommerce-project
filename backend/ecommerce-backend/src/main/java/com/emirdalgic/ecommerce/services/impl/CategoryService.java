package com.emirdalgic.ecommerce.services.impl;

import com.emirdalgic.ecommerce.dto.DtoCategory;
import com.emirdalgic.ecommerce.entities.Category;
import com.emirdalgic.ecommerce.repository.CategoryRepository;
import com.emirdalgic.ecommerce.services.ICategoryService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CategoryService implements ICategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public List<DtoCategory> listCategories() {
        List<Category> categories = categoryRepository.findAll();
        List<DtoCategory> dtoCategories = new ArrayList<>();
        for(Category category : categories){
            DtoCategory dtoCategory = new DtoCategory();
            BeanUtils.copyProperties(category, dtoCategory);
            dtoCategories.add(dtoCategory);
        }
        return dtoCategories;
    }
}
