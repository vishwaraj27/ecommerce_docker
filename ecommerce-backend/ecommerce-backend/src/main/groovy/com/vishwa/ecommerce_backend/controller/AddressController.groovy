package com.vishwa.ecommerce_backend.controller

import com.vishwa.ecommerce_backend.entity.Address
import com.vishwa.ecommerce_backend.service.AddressService
import com.vishwa.ecommerce_backend.service.UserService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

import java.security.Principal

@RestController
@RequestMapping("/api/addresses")
@CrossOrigin(origins = ["http://localhost:4200"])
class AddressController {

    AddressService addressService
    UserService userService

    AddressController(AddressService as, UserService us) {
        this.addressService = as
        this.userService = us
    }

    @GetMapping("/me")
    ResponseEntity listMy(Principal principal) {
        if (!principal) return ResponseEntity.status(401).build()
        def user = userService.findByEmail(principal.name)
        ResponseEntity.ok(addressService.listForUser(user.id))
    }

    @PostMapping("/me")
    ResponseEntity createMy(Principal principal, @RequestBody Address body) {
        def user = userService.findByEmail(principal.name)
        body.userId = user.id
        def saved = addressService.create(body)
        if (saved.isDefault) userService.setDefaultAddress(user.id, saved.id)
        ResponseEntity.ok(saved)
    }

    @PutMapping("/me/{id}")
    ResponseEntity updateMy(
            Principal principal,
            @PathVariable("id") Long id,     // ✅ FIXED
            @RequestBody Address body
    ) {
        def user = userService.findByEmail(principal.name)
        def existing = addressService.get(id)
        if (!existing || existing.userId != user.id) return ResponseEntity.status(403).build()

        def saved = addressService.update(id, body)
        if (saved.isDefault) userService.setDefaultAddress(user.id, saved.id)
        ResponseEntity.ok(saved)
    }

    @DeleteMapping("/me/{id}")
    ResponseEntity deleteMy(
            Principal principal,
            @PathVariable("id") Long id     // ✅ FIXED
    ) {
        def user = userService.findByEmail(principal.name)
        def existing = addressService.get(id)
        if (!existing || existing.userId != user.id) return ResponseEntity.status(403).build()

        addressService.delete(id)
        ResponseEntity.noContent().build()
    }

    @PostMapping("/me/{id}/default")
    ResponseEntity setDefault(
            Principal principal,
            @PathVariable("id") Long id      // ✅ FIXED
    ) {
        def user = userService.findByEmail(principal.name)
        addressService.setDefaultForUser(user.id, id)
        userService.setDefaultAddress(user.id, id)
        ResponseEntity.ok().build()
    }
}
