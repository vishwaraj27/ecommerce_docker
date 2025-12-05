package com.vishwa.ecommerce_backend.controller

import org.springframework.web.bind.annotation.*
import org.springframework.http.ResponseEntity
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import com.vishwa.ecommerce_backend.repository.UserRepository
import com.vishwa.ecommerce_backend.entity.Users
import com.vishwa.ecommerce_backend.security.JwtTokenProvider
import org.springframework.http.HttpStatus

@RestController
@RequestMapping("/api/auth")
class AuthController {

    private final UserRepository userRepository
    private final BCryptPasswordEncoder passwordEncoder
    private final JwtTokenProvider jwtTokenProvider

    AuthController(UserRepository userRepository, JwtTokenProvider jwtTokenProvider) {
        this.userRepository = userRepository
        this.passwordEncoder = new BCryptPasswordEncoder()
        this.jwtTokenProvider = jwtTokenProvider
    }

    // ✅ Register new user
    @PostMapping("/register")
    ResponseEntity<?> register(@RequestBody Users user) {
        if (userRepository.findByEmail(user.email).isPresent()) {
            return ResponseEntity.badRequest().body([message: "Email already in use"])
        }

        user.password = passwordEncoder.encode(user.password)
        def savedUser = userRepository.save(user)
        return ResponseEntity.ok(savedUser)
    }

    // ✅ Login existing user
    @PostMapping("/login")
    ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        def email = body.email
        def password = body.password
        def userOpt = userRepository.findByEmail(email)

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                 .body([message: "Invalid credentials"])
        }

        def user = userOpt.get()
        if (!passwordEncoder.matches(password, user.password)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                 .body([message: "Invalid credentials"])
        }

        def token = jwtTokenProvider.createToken(user.email, user.role)

        return ResponseEntity.ok([
          token: token,
          email: user.email,
          name : user.name
         ])
    }

    // ✅ Forgot Password
    @PostMapping("/forgot-password")
    ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> body) {
        def email = body.email
        if (!email) {
            return ResponseEntity.badRequest().body([message: "Email is required"])
        }

        def userOpt = userRepository.findByEmail(email)
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                 .body([message: "User not found"])
        }

        def user = userOpt.get()
        def resetToken = UUID.randomUUID().toString()
        user.resetToken = resetToken
        userRepository.save(user)

        println "🔗 Password reset link: http://localhost:4200/reset-password?token=$resetToken"

        return ResponseEntity.ok([message: "Password reset link sent to your email (check console)"])
    }

    // ✅ Reset Password (handles reused, invalid, or expired tokens)
    @PostMapping("/reset-password")
    ResponseEntity<?> resetPassword(@RequestBody Map<String, String> body) {
        def token = body.token
        def newPassword = body.newPassword

        if (!token || !newPassword) {
            return ResponseEntity.badRequest()
                                 .body([message: "new password is required"])
        }

        def userOpt = userRepository.findByResetToken(token)

        // Case 1: Token not found (expired or used)
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                                 .body([message: "This reset link has already been used or expired. Please request a new one."])
        }

        def user = userOpt.get()

        // Case 2: Just in case token exists but was cleared
        if (!user.resetToken) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                                 .body([message: "This reset link has already been used. Please request a new one."])
        }

        // ✅ Update password and clear token
        user.password = passwordEncoder.encode(newPassword)
        user.resetToken = null
        userRepository.save(user)

        return ResponseEntity.ok([message: "Password reset successful! You can now log in."])
    }
}
