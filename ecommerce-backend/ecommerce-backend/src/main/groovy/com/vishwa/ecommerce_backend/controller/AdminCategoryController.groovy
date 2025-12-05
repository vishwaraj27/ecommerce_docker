package com.vishwa.ecommerce_backend.controller

import com.vishwa.ecommerce_backend.entity.Category
import com.vishwa.ecommerce_backend.repository.CategoryRepository
import org.springframework.web.bind.annotation.*
import org.springframework.http.ResponseEntity
import org.springframework.http.HttpStatus

@RestController
@RequestMapping("/api/admin/categories")
class AdminCategoryController {

    private final CategoryRepository repo

    AdminCategoryController(CategoryRepository repo) {
        this.repo = repo
    }

    private String toSlug(String name) {
        return name.toLowerCase()
                   .replaceAll("[^a-z0-9]+", "-")
                   .replaceAll(/^-|-$/, "")
    }

    @GetMapping
    ResponseEntity<?> list() {
        return ResponseEntity.ok(repo.findAll())
    }

    @GetMapping("/{id}")
    ResponseEntity<?> get(@PathVariable("id") Long id) {   // ✅ explicit name
        def c = repo.findById(id)
        return c.isPresent() ? ResponseEntity.ok(c.get()) : ResponseEntity.notFound().build()
    }

    @PostMapping
    ResponseEntity<?> create(@RequestBody Category cat) {
        cat.slug = toSlug(cat.name)
        return ResponseEntity.status(HttpStatus.CREATED).body(repo.save(cat))
    }

    @PutMapping("/{id}")
    ResponseEntity<?> update(
            @PathVariable("id") Long id,                  // ✅ explicit name
            @RequestBody Category cat
    ) {
        def existing = repo.findById(id)
        if (existing.isEmpty()) return ResponseEntity.notFound().build()

        def c = existing.get()
        c.name = cat.name
        c.slug = toSlug(cat.name)
        c.parentId = cat.parentId
        c.active = cat.active

        return ResponseEntity.ok(repo.save(c))
    }

    @DeleteMapping("/{id}")
    ResponseEntity<?> delete(@PathVariable("id") Long id) {   // ✅ explicit name
        def c = repo.findById(id)
        if (c.isEmpty()) return ResponseEntity.notFound().build()

        def cat = c.get()
        cat.active = false   // soft delete

        return ResponseEntity.ok(repo.save(cat))
    }
}
