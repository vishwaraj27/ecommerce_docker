package com.vishwa.ecommerce_backend.entity

import jakarta.persistence.*

@Entity
@Table(name = "users")
class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id

    @Column(nullable = false)
    String name

    String firstName
    String lastName
    String phone
    String avatarUrl

    @Column(nullable = false, unique = true)
    String email

    @Column(nullable = false)
    String password

    @Column(nullable = false)
    String role = "ROLE_USER"

    String resetToken

    @Column(nullable = true)
    Long defaultAddressId
}
