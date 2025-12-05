package com.vishwa.ecommerce_backend.repository

import com.vishwa.ecommerce_backend.entity.CartItem
import com.vishwa.ecommerce_backend.entity.Product
import com.vishwa.ecommerce_backend.entity.Users
import org.springframework.data.jpa.repository.JpaRepository

interface CartRepository extends JpaRepository<CartItem, Long> {

    List<CartItem> findByUsers(Users users)

    Optional<CartItem> findByUsersAndProduct(Users users, Product product)

    void deleteByUsers(Users users)
}
