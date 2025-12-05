package com.vishwa.ecommerce_backend.controller

import com.vishwa.ecommerce_backend.entity.Product
import com.vishwa.ecommerce_backend.service.ProductService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@CrossOrigin(origins = ["http://localhost:4200"])  // ✅ Allow Angular frontend
@RestController
@RequestMapping("/api/products")
class ProductController {

    @Autowired
    ProductService productService

    @GetMapping
    ResponseEntity<List<Product>> getAllProducts() {
        def products = productService.getAllProducts()
        return ResponseEntity.ok(products)
    }

    @GetMapping("/{id}")
    ResponseEntity<Product> getProductById(@PathVariable("id") Long id) {
        def product = productService.getProductById(id)
        if (product.isPresent()) {
            return ResponseEntity.ok(product.get())
        } else {
            return ResponseEntity.notFound().build()
        }
    }

    @PostMapping
    ResponseEntity<Product> createProduct(@RequestBody Product product) {
        def saved = productService.saveProduct(product)
        return ResponseEntity.ok(saved)
    }

    @PutMapping("/{id}")
    ResponseEntity<Product> updateProduct(@PathVariable("id") Long id, @RequestBody Product product) {
        def updated = productService.updateProduct(id, product)
        return ResponseEntity.ok(updated)
    }

    @DeleteMapping("/{id}")
    ResponseEntity<Void> deleteProduct(@PathVariable("id") Long id) {
        productService.deleteProduct(id)
        return ResponseEntity.noContent().build()
    }

   @GetMapping("/search")
 ResponseEntity<List<Product>> searchProducts(@RequestParam("query") String query) {
    def results = productService.search(query)
    return ResponseEntity.ok(results)
  }
}
