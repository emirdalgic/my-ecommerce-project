package com.emirdalgic.ecommerce.repository;

import com.emirdalgic.ecommerce.entities.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
}
