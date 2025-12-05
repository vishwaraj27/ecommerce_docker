package com.vishwa.ecommerce_backend.repository

import com.vishwa.ecommerce_backend.entity.Product
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository

@Repository
interface ProductRepository extends JpaRepository<Product, Long> {

    /**
     * ADMIN SEARCH
     * Search by:
     *  - product name
     *  - category.name (ManyToOne)
     */
    Page<Product> findByNameContainingIgnoreCaseOrCategory_NameContainingIgnoreCase(
            String name,
            String categoryName,
            Pageable pageable
    )

    /**
     * USER SEARCH (Full text + similarity fallback)
     * NOTE: Contains legacy `category` because old column still exists.
     * This will continue to work until you drop old `category` column.
     */
    @Query(value = """
        SELECT *
        FROM products
        WHERE name ILIKE CONCAT('%', :query, '%')
           OR description ILIKE CONCAT('%', :query, '%')         -- legacy fallback
           OR similarity(name, :query) > 0.3
           OR similarity(description, :query) > 0.3
        ORDER BY similarity(name, :query) DESC
        LIMIT 10
    """, nativeQuery = true)
    List<Product> search(@Param("query") String query)
}
