package com.vishwa.ecommerce_backend.security

import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import io.jsonwebtoken.security.Keys
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component

import javax.crypto.SecretKey
import java.util.*

@Component
class JwtTokenProvider {

    @Value('${jwt.secret:}')
    private String secretFromConfig

    private SecretKey getSigningKey() {
        if (secretFromConfig && secretFromConfig.length() >= 32) {
            return Keys.hmacShaKeyFor(secretFromConfig.getBytes())
        } else {
            println "Using auto-generated JWT key (set jwt.secret for consistency)"
            return Keys.secretKeyFor(SignatureAlgorithm.HS256)
        }
    }

    String createToken(String email, String role) {
        Date now = new Date()
        Date expiry = new Date(now.time + 3600000)

        Map<String, Object> claims = [
                roles: [role]
        ]

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(email)
                .setIssuedAt(now)
                .setExpiration(expiry)
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact()
    }

    String getEmailFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject()
    }

    boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token)
            return true
        } catch (Exception ex) {
            println("❌ Invalid JWT token: ${ex.message}")
            return false
        }
    }

    String extractUsername(String token) {
        return getEmailFromToken(token)
    }

    /**
     * Safely extract roles claim as List<String>
     */
    List<String> getRolesFromToken(String token) {
        try {
            def body = Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody()

            // explicitly get the "roles" claim and verify its type
            def rawRoles = body.get("roles")
            if (rawRoles instanceof List) {
                // convert each element to string to be safe
                return rawRoles.collect { it?.toString() }
            }

            // maybe it was stored as a comma-separated string
            if (rawRoles instanceof String) {
                return rawRoles.tokenize(',').collect { it.trim() }
            }

            return []
        } catch (Exception ex) {
            println("❌ Failed to read roles from token: ${ex.message}")
            return []
        }
    }
}
