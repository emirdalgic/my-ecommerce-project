package com.emirdalgic.ecommerce.services;

import com.emirdalgic.ecommerce.dto.DtoCategory;

import java.util.List;

public interface ICategoryService {
    public List<DtoCategory> listCategories();
    public DtoCategory getCategoryById(Long id);
    public DtoCategory saveCategory(String name);
    public DtoCategory renameCategoryById(Long id, String name);
    public void deleteCategoryById(Long id);
}
