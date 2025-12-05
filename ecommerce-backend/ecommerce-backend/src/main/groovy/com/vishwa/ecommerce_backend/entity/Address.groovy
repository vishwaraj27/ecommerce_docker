package com.vishwa.ecommerce_backend.entity

import jakarta.persistence.*

@Entity
@Table(name = "addresses")
class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id

    Long userId

    String label
    String fullName
    String phone

    String line1
    String line2
    String city
    String state
    String postalCode
    String country

    Double latitude
    Double longitude

    Boolean isDefault = false

    java.time.OffsetDateTime createdAt = java.time.OffsetDateTime.now()
    java.time.OffsetDateTime updatedAt = java.time.OffsetDateTime.now()
}
