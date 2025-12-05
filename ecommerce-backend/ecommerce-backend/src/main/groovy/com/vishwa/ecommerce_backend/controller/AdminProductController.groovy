package com.vishwa.ecommerce_backend.controller

import com.fasterxml.jackson.databind.ObjectMapper
import com.vishwa.ecommerce_backend.entity.Product
import com.vishwa.ecommerce_backend.repository.ProductRepository
import com.vishwa.ecommerce_backend.repository.CategoryRepository
import org.springframework.beans.factory.annotation.Value
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile

import jakarta.transaction.Transactional
import java.nio.file.Files
import java.nio.file.Path
import java.nio.file.Paths
import java.time.Instant
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule
import com.fasterxml.jackson.databind.SerializationFeature

@RestController
@RequestMapping("/api/admin/products")
class AdminProductController {

    final ProductRepository productRepository
    final CategoryRepository categoryRepository

    final ObjectMapper mapper = new ObjectMapper()
            .registerModule(new JavaTimeModule())
            .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS)

    @Value('${app.upload.dir:uploads}')
    String uploadDir

    AdminProductController(ProductRepository productRepository,
                           CategoryRepository categoryRepository) {
        this.productRepository = productRepository
        this.categoryRepository = categoryRepository
    }

    // ---------------------- LIST + SEARCH ----------------------
    @GetMapping
    ResponseEntity<Map> list(
        @RequestParam(name="page", defaultValue="0") int page,
        @RequestParam(name="size", defaultValue="20") int size,
        @RequestParam(name="search", required=false) String search
    ) {

        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending())
        Page<Product> data

        if (search) {
            data = productRepository
                    .findByNameContainingIgnoreCaseOrCategory_NameContainingIgnoreCase(
                            search, search, pageable
                    )
        } else {
            data = productRepository.findAll(pageable)
        }

        return ResponseEntity.ok([
                content        : data.content,
                page           : data.number,
                size           : data.size,
                totalElements  : data.totalElements,
                totalPages     : data.totalPages
        ])
    }

    // ---------------------- GET ONE ----------------------
    @GetMapping("/{id}")
    ResponseEntity<Product> get(@PathVariable("id") Long id) {
        return productRepository.findById(id)
                .map { ResponseEntity.ok(it) }
                .orElse(ResponseEntity.notFound().build())
    }

    // ---------------------- CREATE ----------------------
    @PostMapping(consumes = [MediaType.MULTIPART_FORM_DATA_VALUE])
    @Transactional
    ResponseEntity<?> create(
            @RequestParam("product") String productJson,
            @RequestParam(value = "images", required = false) MultipartFile[] images
    ) {

        Product p = mapper.readValue(productJson, Product)

        // ⭐ Resolve category
        if (p.category?.id) {
            p.category = categoryRepository.findById(p.category.id)
                    .orElseThrow { new RuntimeException("Category not found") }
        }

        p.createdAt = Instant.now()
        p.updatedAt = Instant.now()

        p = productRepository.save(p)

        if (images) {
            p.images = storeImages(p.id, images)
            productRepository.save(p)
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(p)
    }

    // ---------------------- UPDATE ----------------------
    @PutMapping(value = "/{id}", consumes = [MediaType.MULTIPART_FORM_DATA_VALUE])
    @Transactional
    ResponseEntity<?> update(
        @PathVariable("id") Long id,
        @RequestParam("product") String productJson,
        @RequestParam(value = "images", required = false) MultipartFile[] images,
        @RequestParam(name = "appendImages", defaultValue = "true") boolean appendImages
    ) {

        Product existing = productRepository.findById(id).orElse(null)
        if (!existing)
            return ResponseEntity.status(404).body([message: "Product not found"])

        Product updated = mapper.readValue(productJson, Product)

        // Resolve category
        if (updated.category?.id) {
            updated.category = categoryRepository.findById(updated.category.id)
                    .orElseThrow { new RuntimeException("Category not found") }
        }

        existing.name = updated.name
        existing.description = updated.description
        existing.category = updated.category
        existing.price = updated.price
        existing.costPrice = updated.costPrice
        existing.stockQuantity = updated.stockQuantity
        existing.reorderLevel = updated.reorderLevel
        existing.featured = updated.featured
        existing.active = updated.active
        existing.updatedAt = Instant.now()

        if (images) {
            String newImgs = storeImages(existing.id, images)
            if (appendImages && existing.images) {
                existing.images = existing.images + "," + newImgs
            } else {
                existing.images = newImgs
            }
        }

        productRepository.save(existing)
        return ResponseEntity.ok(existing)
    }

    // ---------------------- SOFT DELETE ----------------------
    @DeleteMapping("/{id}")
    @Transactional
    ResponseEntity<?> delete(@PathVariable("id") Long id) {
        Product p = productRepository.findById(id).orElse(null)
        if (!p) return ResponseEntity.status(404).body([message: "Not found"])
        p.active = false
        productRepository.save(p)
        return ResponseEntity.ok([message: "deleted"])
    }

    // ---------------------- Helper: Store Images ----------------------
    private String storeImages(Long productId, MultipartFile[] images) {
        Path uploadPath = Paths.get(uploadDir)
        if (!Files.exists(uploadPath)) Files.createDirectories(uploadPath)

        List<String> stored = []
        images.each { file ->
            if (!file.isEmpty()) {
                String ext = file.originalFilename.substring(file.originalFilename.lastIndexOf('.'))
                String filename = "product-${productId}-${System.currentTimeMillis()}${ext}"
                Path filePath = uploadPath.resolve(filename)
                Files.copy(file.inputStream, filePath)
                stored << filename
            }
        }
        return stored.join(',')
    }
}
