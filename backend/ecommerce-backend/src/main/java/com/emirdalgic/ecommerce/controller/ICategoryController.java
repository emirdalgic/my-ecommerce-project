package com.emirdalgic.ecommerce.controller;

import com.emirdalgic.ecommerce.dto.DtoCategory;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ICategoryController {
        public List<DtoCategory> listCategories();
        public ResponseEntity<DtoCategory> getCategoryById(Long id);
}
