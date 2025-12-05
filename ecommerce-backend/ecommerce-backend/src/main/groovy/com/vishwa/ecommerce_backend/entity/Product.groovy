package com.vishwa.ecommerce_backend.entity

import jakarta.persistence.*
import java.time.Instant

@Entity
@Table(name = "products")
class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id

    // Basic fields
    String name
    String description
    @ManyToOne
    @JoinColumn(name = "category_id")
    Category category

    // Pricing
    Double price
    Double costPrice

    // Inventory
    Integer stockQuantity = 0
    Integer reorderLevel = 0

    // Images (comma separated)
    String images  // "img1.jpg,img2.jpg"

    // Product flags
    Boolean featured = false
    Boolean active = true

    // Timestamps
    Instant createdAt = Instant.now()
    Instant updatedAt = Instant.now()

    @PreUpdate
    void onUpdate() {
        updatedAt = Instant.now()
    }
}
