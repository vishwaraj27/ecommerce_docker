package com.vishwa.ecommerce_backend.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import com.vishwa.ecommerce_backend.entity.Users
import java.util.Optional

@Repository
interface UserRepository extends JpaRepository<Users, Long> {
    Optional<Users> findByEmail(String email)
    Optional<Users> findByResetToken(String resetToken)
}
