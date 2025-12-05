package com.vishwa.ecommerce_backend.entity

import jakarta.persistence.*

@Entity
@Table(name = "categories")
class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id

    @Column(nullable = false, unique = true)
    String name

    @Column(nullable = false, unique = true)
    String slug

    Long parentId = 0
    Boolean active = true
}
