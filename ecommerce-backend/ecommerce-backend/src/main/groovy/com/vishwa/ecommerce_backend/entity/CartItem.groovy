package com.vishwa.ecommerce_backend.entity

import jakarta.persistence.*

@Entity
@Table(name = "cart_items")
class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    Users users

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id", nullable = false)
    Product product

    int quantity = 1
}
