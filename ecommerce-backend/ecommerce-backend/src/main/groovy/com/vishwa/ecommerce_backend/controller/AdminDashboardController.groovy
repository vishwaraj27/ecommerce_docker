package com.vishwa.ecommerce_backend.controller

import com.vishwa.ecommerce_backend.repository.OrderRepository
import com.vishwa.ecommerce_backend.repository.UserRepository
import com.vishwa.ecommerce_backend.repository.ProductRepository
import org.springframework.web.bind.annotation.*
import org.springframework.http.ResponseEntity
import java.time.LocalDate

@RestController
@RequestMapping("/api/admin/dashboard")
class AdminDashboardController {

    private final OrderRepository orderRepo
    private final UserRepository userRepo
    private final ProductRepository productRepo

    AdminDashboardController(OrderRepository orderRepo,
                             UserRepository userRepo,
                             ProductRepository productRepo) {
        this.orderRepo = orderRepo
        this.userRepo = userRepo
        this.productRepo = productRepo
    }

    @GetMapping("/summary")
    ResponseEntity<?> summary() {

        def orders = orderRepo.findAll()
        def users = userRepo.findAll()
        def products = productRepo.findAll()

        double revenue = orders.collect { it.grandTotal ?: 0.0 }.sum()

        int lowStock = products.count { it.stockQuantity <= it.reorderLevel }

        int todayOrders = orders.count {
            it.createdAt.toLocalDate().isEqual(LocalDate.now())
        }

        return ResponseEntity.ok([
                totalOrders : orders.size(),
                totalUsers  : users.size(),
                revenue     : revenue,
                lowStock    : lowStock,
                todayOrders : todayOrders
        ])
    }

    @GetMapping("/recent-orders")
    ResponseEntity<?> recentOrders() {
        def lastFive = orderRepo.findAll().sort { -it.id }.take(5)
        return ResponseEntity.ok(lastFive)
    }
}
