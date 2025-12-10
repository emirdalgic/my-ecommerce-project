package com.emirdalgic.ecommerce.services.impl;

import com.emirdalgic.ecommerce.dto.DtoCategory;
import com.emirdalgic.ecommerce.entities.Category;
import com.emirdalgic.ecommerce.entities.Product;
import com.emirdalgic.ecommerce.exception.BaseException;
import com.emirdalgic.ecommerce.exception.MessageType;
import com.emirdalgic.ecommerce.repository.CategoryRepository;
import com.emirdalgic.ecommerce.repository.ProductRepository;
import com.emirdalgic.ecommerce.services.ICategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService implements ICategoryService {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;

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

    @Override
    public DtoCategory getCategoryById(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(()-> new BaseException(MessageType.NO_RECORD_EXIST));
        DtoCategory dtoCategory = new DtoCategory();

        BeanUtils.copyProperties(category, dtoCategory);
        return dtoCategory;
    }

    @Override
    public DtoCategory saveCategory(String name) {
        if(name != null && !name.isEmpty()){
            Category category = new Category();
            category.setName(name);
            Category savedCategory = categoryRepository.save(category);
            DtoCategory dtoCategory = new DtoCategory();
            BeanUtils.copyProperties(savedCategory, dtoCategory);
            return dtoCategory;
        }
        throw new RuntimeException("empty field");
    }

    @Override
    public DtoCategory renameCategoryById(Long id, String name) {
        if(name != null && !name.isEmpty()){
            Category category = categoryRepository.findById(id)
                    .orElseThrow(()-> new BaseException(MessageType.NO_RECORD_EXIST));

            category.setName(name);
            Category updatedCategory = categoryRepository.save(category);
            DtoCategory dtoCategory = new DtoCategory();
            BeanUtils.copyProperties(updatedCategory, dtoCategory);

            return dtoCategory;
        }
        throw new RuntimeException("empty field");
    }

    @Override
    public void deleteCategoryById(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new BaseException(MessageType.NO_RECORD_EXIST));

        List<Product> products = productRepository.findByCategoryId(id);

        for (Product product : products) {
            throw new RuntimeException("Products are available in this category. Please move the products to another category before deleting them..");
        }

        categoryRepository.deleteById(id);
    }
}
