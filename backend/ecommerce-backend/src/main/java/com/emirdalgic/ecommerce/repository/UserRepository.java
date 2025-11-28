package com.emirdalgic.ecommerce.repository;

import com.emirdalgic.ecommerce.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
