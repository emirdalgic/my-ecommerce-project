package com.emirdalgic.ecommerce.repository;

import com.emirdalgic.ecommerce.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
