package com.vishwa.ecommerce_backend.service

import com.vishwa.ecommerce_backend.entity.CartItem
import com.vishwa.ecommerce_backend.repository.CartRepository
import com.vishwa.ecommerce_backend.repository.UserRepository
import com.vishwa.ecommerce_backend.repository.ProductRepository
import com.vishwa.ecommerce_backend.security.JwtTokenProvider
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional   // ✅ add this

@Transactional   // ✅ this fixes your error
@Service
class CartService {

    @Autowired CartRepository cartRepository
    @Autowired UserRepository userRepository
    @Autowired ProductRepository productRepository
    @Autowired JwtTokenProvider jwtTokenProvider

    List<CartItem> getAllItems(String token) {
        def email = jwtTokenProvider.extractUsername(token)
        def user = userRepository.findByEmail(email).orElseThrow()

        return cartRepository.findByUsers(user)
    }

    CartItem addToCart(String token, Long productId) {
        def email = jwtTokenProvider.extractUsername(token)
        def user = userRepository.findByEmail(email).orElseThrow()
        def product = productRepository.findById(productId).orElseThrow()

        // find existing cart item
        def existing = cartRepository.findByUsersAndProduct(user, product).orElse(null)

        if (existing) {
            existing.quantity += 1
            return cartRepository.save(existing)
        }

        def item = new CartItem(users: user, product: product, quantity: 1)
        return cartRepository.save(item)
    }

    void removeFromCart(String token, Long productId) {
        def email = jwtTokenProvider.extractUsername(token)
        def user = userRepository.findByEmail(email).orElseThrow()
        def product = productRepository.findById(productId).orElseThrow()

        def item = cartRepository.findByUsersAndProduct(user, product)
                .orElseThrow { new RuntimeException("Item not found") }

        cartRepository.delete(item)
    }

    void clearCart(String token) {
        def email = jwtTokenProvider.extractUsername(token)
        def user = userRepository.findByEmail(email).orElseThrow()

        cartRepository.deleteByUsers(user)
    }

    CartItem updateQuantity(String token, Long productId, int qty) {
        def email = jwtTokenProvider.extractUsername(token)
        def user = userRepository.findByEmail(email).orElseThrow()
        def product = productRepository.findById(productId).orElseThrow()

        def item = cartRepository.findByUsersAndProduct(user, product)
                .orElseThrow { new RuntimeException("Item not found") }

        item.quantity = qty
        return cartRepository.save(item)
    }
}
