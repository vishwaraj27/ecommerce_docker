package com.vishwa.ecommerce_backend.repository

import com.vishwa.ecommerce_backend.entity.Order
import com.vishwa.ecommerce_backend.entity.Users
import org.springframework.data.jpa.repository.JpaRepository

interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByUsers(Users users)

    // ⭐ REQUIRED FOR ORDER CONFIRMATION PAGE
    Optional<Order> findByIdAndUsers(Long id, Users users)
}
