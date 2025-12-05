package com.vishwa.ecommerce_backend.service

import com.vishwa.ecommerce_backend.entity.Product
import com.vishwa.ecommerce_backend.repository.ProductRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class ProductService {

    @Autowired
    ProductRepository productRepository

    List<Product> getAllProducts() {
        productRepository.findAll()
    }

    Optional<Product> getProductById(Long id) {
        productRepository.findById(id)
    }

    Product saveProduct(Product product) {
        productRepository.save(product)
    }

    void deleteProduct(Long id) {
        productRepository.deleteById(id)
    }

     List<Product> search(String query) {
        productRepository.search(query)
    }
}
