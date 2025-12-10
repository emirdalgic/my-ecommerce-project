package com.emirdalgic.ecommerce.controller.impl;

import com.emirdalgic.ecommerce.controller.ICategoryController;
import com.emirdalgic.ecommerce.dto.DtoCategory;
import com.emirdalgic.ecommerce.services.ICategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping(path = "/list/{id}")
    @Override
    public ResponseEntity<DtoCategory> getCategoryById(@PathVariable(name = "id") Long id) {
        DtoCategory category = categoryService.getCategoryById(id);
        return ResponseEntity.ok(category);
    }


    @PostMapping(path = "/save")
    @Override
    public ResponseEntity<DtoCategory> saveCategory(String name) {
        DtoCategory dtoCategory = categoryService.saveCategory(name);
        return ResponseEntity.status(HttpStatus.CREATED).body(dtoCategory);
    }

    @PutMapping(path = "/update/{id}")
    @Override
    public ResponseEntity<DtoCategory> renameCategoryById(@PathVariable(name = "id") Long id, String name) {
        DtoCategory dtoCategory = categoryService.renameCategoryById(id, name);
        return ResponseEntity.ok(dtoCategory);
    }

    @DeleteMapping(path = "delete/{id}")
    @Override
    public ResponseEntity<Void> deleteCategoryById(@PathVariable(name = "id") Long id) {
        categoryService.deleteCategoryById(id);
        return ResponseEntity.noContent().build();
    }
}
