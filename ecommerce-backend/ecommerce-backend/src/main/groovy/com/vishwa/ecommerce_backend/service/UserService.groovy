package com.vishwa.ecommerce_backend.service

import com.vishwa.ecommerce_backend.entity.Users
import com.vishwa.ecommerce_backend.repository.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class UserService {

    @Autowired
    UserRepository userRepository

    Users findByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null)
    }

    Users findById(Long id) {
        return userRepository.findById(id).orElse(null)
    }

    Users updateProfile(String email, Map body) {
        def user = findByEmail(email)
        if (!user) return null

        user.name       = body.name       ?: user.name
        user.firstName  = body.firstName  ?: user.firstName
        user.lastName   = body.lastName   ?: user.lastName
        user.phone      = body.phone      ?: user.phone
        user.avatarUrl  = body.avatarUrl  ?: user.avatarUrl

        return userRepository.save(user)
    }

     Users setDefaultAddress(Long userId, Long addressId) {
        def user = userRepository.findById(userId).orElse(null)
        if (!user) return null

        user.defaultAddressId = addressId
        userRepository.save(user)
    }
}
