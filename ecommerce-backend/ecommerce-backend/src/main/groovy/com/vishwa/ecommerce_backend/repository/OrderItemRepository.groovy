package com.vishwa.ecommerce_backend.repository

import com.vishwa.ecommerce_backend.entity.OrderItem
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface OrderItemRepository extends JpaRepository<OrderItem, Long> { }
