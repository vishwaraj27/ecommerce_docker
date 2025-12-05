package com.vishwa.ecommerce_backend.controller

import com.vishwa.ecommerce_backend.entity.CartItem
import com.vishwa.ecommerce_backend.service.CartService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:4200")
class CartController {

    @Autowired
    CartService cartService

    @GetMapping
    List<CartItem> getCart(@RequestHeader("Authorization") String token) {
        def jwt = token.replace("Bearer ", "")
        return cartService.getAllItems(jwt)
    }

    @PostMapping("/add/{productId}")
    ResponseEntity<CartItem> addToCart(
            @RequestHeader("Authorization") String token,
            @PathVariable("productId") Long productId   // ✅ Explicit name added
    ) {
        def jwt = token.replace("Bearer ", "")
        def item = cartService.addToCart(jwt, productId)
        return ResponseEntity.ok(item)
    }

    @DeleteMapping("/remove/{productId}")
    ResponseEntity<Void> removeFromCart(
            @RequestHeader("Authorization") String token,
            @PathVariable("productId") Long productId   // ✅ Explicit name added
    ) {
        def jwt = token.replace("Bearer ", "")
        cartService.removeFromCart(jwt, productId)
        return ResponseEntity.noContent().build()
    }

    @DeleteMapping("/clear")
    ResponseEntity<Void> clearCart(@RequestHeader("Authorization") String token) {
        def jwt = token.replace("Bearer ", "")
        cartService.clearCart(jwt)
        return ResponseEntity.noContent().build()
    }

    @PutMapping("/update/{productId}")
ResponseEntity<CartItem> updateQuantity(
        @RequestHeader("Authorization") String token,
        @PathVariable("productId") Long productId,
        @RequestParam("quantity") int quantity
) {
    def jwt = token.replace("Bearer ", "")
    def item = cartService.updateQuantity(jwt, productId, quantity)
    return ResponseEntity.ok(item)
}
}
