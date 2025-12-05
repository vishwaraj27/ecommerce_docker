package com.vishwa.ecommerce_backend.entity

import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "orders")
class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    Users users

    // -------- Address Snapshot --------
    String fullName
    String phone
    String line1
    String line2
    String city
    String state
    String postalCode
    String country

    // -------- Payment --------
    String paymentMethod = "COD"
    String paymentStatus = "PENDING"

    // -------- Delivery --------
    String deliveryStatus = "PLACED"

    // -------- Price Breakdown --------
    Double itemsTotal = 0.0
    Double tax = 0.0
    Double shippingFee = 0.0
    Double grandTotal = 0.0

    LocalDateTime createdAt = LocalDateTime.now()

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    List<OrderItem> items = []
}
