package com.emirdalgic.ecommerce.repository;

import com.emirdalgic.ecommerce.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
