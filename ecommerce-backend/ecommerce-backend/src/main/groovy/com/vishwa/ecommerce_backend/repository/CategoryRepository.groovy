package com.vishwa.ecommerce_backend.repository

import com.vishwa.ecommerce_backend.entity.Category
import org.springframework.data.jpa.repository.JpaRepository

interface CategoryRepository extends JpaRepository<Category, Long> {
    Optional<Category> findBySlug(String slug)
    Optional<Category> findByName(String name)
}
