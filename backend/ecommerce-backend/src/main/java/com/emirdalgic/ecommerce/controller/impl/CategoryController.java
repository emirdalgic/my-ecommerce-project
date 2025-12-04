package com.emirdalgic.ecommerce.controller.impl;

import com.emirdalgic.ecommerce.controller.ICategoryController;
import com.emirdalgic.ecommerce.dto.DtoCategory;
import com.emirdalgic.ecommerce.services.ICategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/categories")
@RequiredArgsConstructor
public class CategoryController implements ICategoryController {
    private final ICategoryService categoryService;

    @GetMapping(path = "/list")
    @Override
    public List<DtoCategory> listCategories() {
        return categoryService.listCategories();
    }
}
