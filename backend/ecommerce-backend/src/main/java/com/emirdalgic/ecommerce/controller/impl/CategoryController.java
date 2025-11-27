package com.emirdalgic.ecommerce.controller.impl;

import com.emirdalgic.ecommerce.controller.ICategoryController;
import com.emirdalgic.ecommerce.services.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/Categories")
public class CategoryController implements ICategoryController {
    @Autowired
    private ICategoryService categoryService;
}
