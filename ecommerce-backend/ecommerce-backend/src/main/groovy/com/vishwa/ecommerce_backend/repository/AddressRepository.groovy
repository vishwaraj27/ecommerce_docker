package com.vishwa.ecommerce_backend.repository

import com.vishwa.ecommerce_backend.entity.Address
import org.springframework.data.jpa.repository.JpaRepository

interface AddressRepository extends JpaRepository<Address, Long> {
    List<Address> findAllByUserIdOrderByIsDefaultDescIdDesc(Long userId)
}
