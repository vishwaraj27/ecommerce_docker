package com.vishwa.ecommerce_backend.controller

import com.vishwa.ecommerce_backend.entity.Users
import com.vishwa.ecommerce_backend.repository.UserRepository
import com.vishwa.ecommerce_backend.service.UserService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

import java.security.Principal

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = ["http://localhost:4200"])
class UserController {

    private final UserRepository userRepository
    private final UserService userService

    UserController(UserRepository userRepository, UserService userService) {
        this.userRepository = userRepository
        this.userService = userService
    }

    // ---------- CURRENT USER ----------
    @GetMapping("/me")
    ResponseEntity getMyProfile(Principal principal) {
        if (!principal) return ResponseEntity.status(401).build()

        def user = userService.findByEmail(principal.name)
        if (!user) return ResponseEntity.status(404).build()

        return ResponseEntity.ok(user)
    }

    @PutMapping("/me")
    ResponseEntity updateMyProfile(Principal principal, @RequestBody Map body) {
        if (!principal) return ResponseEntity.status(401).build()

        def updated = userService.updateProfile(principal.name, body)
        return ResponseEntity.ok(updated)
    }

    // ---------- ADMIN / EXISTING CRUD ----------
    @GetMapping
    def getAllUsers() {
        return userRepository.findAll()
    }

    @GetMapping("/{id}")
    ResponseEntity<Users> getUserById(@PathVariable Long id) {
        userRepository.findById(id)
            .map { ResponseEntity.ok(it) }
            .orElse(ResponseEntity.notFound().build())
    }

    @PostMapping
    Users createUser(@RequestBody Users user) {
        return userRepository.save(user)
    }

    @DeleteMapping("/{id}")
    ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id)
            return ResponseEntity.noContent().build()
        }
        return ResponseEntity.notFound().build()
    }
}
