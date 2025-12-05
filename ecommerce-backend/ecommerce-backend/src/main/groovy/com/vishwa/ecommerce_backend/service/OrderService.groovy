package com.vishwa.ecommerce_backend.service

import com.vishwa.ecommerce_backend.entity.*
import com.vishwa.ecommerce_backend.repository.*
import com.vishwa.ecommerce_backend.security.JwtTokenProvider
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class OrderService {

    @Autowired CartRepository cartRepository
    @Autowired OrderRepository orderRepository
    @Autowired UserRepository userRepository
    @Autowired AddressRepository addressRepository
    @Autowired JwtTokenProvider jwtTokenProvider

    // FULL CHECKOUT WITH PAYLOAD
    Order checkout(String token, Map payload) {

        def username = jwtTokenProvider.extractUsername(token)
        def user = userRepository.findByEmail(username)
                .orElseThrow { new RuntimeException("User not found") }

        def cartItems = cartRepository.findByUsers(user)
        if (cartItems.isEmpty())
            throw new RuntimeException("Cart is empty")

        // Validate & fetch address
        Long addressId = payload.addressId as Long

        def address = addressRepository.findById(addressId)
                .orElseThrow { new RuntimeException("Address not found") }

        if (address.userId != user.id)
            throw new RuntimeException("Unauthorized address")

        // ========== CREATE ORDER ==========
        def order = new Order(
                users: user,

                // SNAPSHOT ADDRESS
                fullName: address.fullName,
                phone: address.phone,
                line1: address.line1,
                line2: address.line2,
                city: address.city,
                state: address.state,
                postalCode: address.postalCode,
                country: address.country,

                // PAYMENT
                paymentMethod: payload.paymentMethod ?: "COD",
                paymentStatus: "PENDING",

                // DELIVERY
                deliveryStatus: "PLACED",

                // AMOUNTS
                itemsTotal: payload.itemsTotal,
                tax: payload.tax,
                shippingFee: payload.shippingFee,
                grandTotal: payload.grandTotal
        )

        // ADD ORDER ITEMS
        cartItems.each { cartItem ->
            def item = new OrderItem(
                    order: order,
                    product: cartItem.product,
                    quantity: cartItem.quantity,
                    price: cartItem.product.price * cartItem.quantity,
                    productName: cartItem.product.name,
                    productImage: cartItem.product.images?.split(",")?.first()
            )
            order.items.add(item)
        }

        def savedOrder = orderRepository.save(order)

        // Clear cart
        cartRepository.deleteAll(cartItems)

        return savedOrder
    }

    Order getOrderById(String token, Long orderId) {

    def username = jwtTokenProvider.extractUsername(token)
    def user = userRepository.findByEmail(username)
            .orElseThrow { new RuntimeException("User not found") }

    def order = orderRepository.findByIdAndUsers(orderId, user)
            .orElseThrow { new RuntimeException("Order not found") }

    return order
   }


    // FETCH USER ORDERS
    List<Order> getUserOrders(String token) {
        def username = jwtTokenProvider.extractUsername(token)
        def user = userRepository.findByEmail(username)
                .orElseThrow { new RuntimeException("User not found") }

        return orderRepository.findByUsers(user)
    }
}
