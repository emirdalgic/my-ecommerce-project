package com.emirdalgic.ecommerce.repository;

import com.emirdalgic.ecommerce.entities.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    //for category
    Page<Product> findAllByCategoryId(Long categoryId, Pageable pageable);
    //for showcase
    List<Product> findTop5ByCategoryIdOrderByIdDesc(Long categoryId);
    //for searchbar
    Page<Product> findByNameContainingIgnoreCase(String name, Pageable pageable);
}
