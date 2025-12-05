package com.vishwa.ecommerce_backend.controller

import com.vishwa.ecommerce_backend.entity.Order
import com.vishwa.ecommerce_backend.service.OrderService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:4200")
class OrderController {

    @Autowired 
    OrderService orderService

    @PostMapping("/checkout")
    ResponseEntity<Order> checkout(
        @RequestHeader("Authorization") String token,
        @RequestBody Map payload
    ) {
        def jwt = token.replace("Bearer ", "")
        def order = orderService.checkout(jwt, payload)
        return ResponseEntity.ok(order)
    }

    @GetMapping
    List<Order> getOrders(@RequestHeader("Authorization") String token) {
        def jwt = token.replace("Bearer ", "")
        return orderService.getUserOrders(jwt)
    }

    // ⭐ NEW — Get single order by ID
    @GetMapping("/{id}")
ResponseEntity<Order> getOrderById(
        @RequestHeader("Authorization") String token,
        @PathVariable("id") Long id   // ✅ FIXED
   ) {
    def jwt = token.replace("Bearer ", "")
    def order = orderService.getOrderById(jwt, id)
    return ResponseEntity.ok(order)
    }

}
