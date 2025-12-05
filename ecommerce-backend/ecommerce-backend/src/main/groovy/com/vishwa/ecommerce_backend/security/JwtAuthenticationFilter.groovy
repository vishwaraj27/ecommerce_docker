package com.vishwa.ecommerce_backend.security

import jakarta.servlet.FilterChain
import jakarta.servlet.ServletException
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.User
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter

@Component
class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider

    JwtAuthenticationFilter(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        try {
            String path = request.getRequestURI()

            // Skip auth endpoints
            if (path != null && path.startsWith("/api/auth/")) {
                filterChain.doFilter(request, response)
                return
            }

            String header = request.getHeader("Authorization")
            if (header != null && header.startsWith("Bearer ")) {
                String token = header.substring(7)

                if (jwtTokenProvider.validateToken(token)) {
                    String username = jwtTokenProvider.extractUsername(token)
                    List<String> roles = jwtTokenProvider.getRolesFromToken(token)

                    def authorities = roles.collect { r ->
                  if (!r) return null
                 def normalized = r.toString().startsWith('ROLE_') ? r.toString() : "ROLE_${r.toString()}"
                 new org.springframework.security.core.authority.SimpleGrantedAuthority(normalized)
                  }.findAll { it != null }
                  println("JwtAuthenticationFilter: username=${username}, roles=${roles}, authorities=${authorities}")


                    // create User with explicit authorities
                    def userDetails = new User(username, "", authorities)
                    def auth = new UsernamePasswordAuthenticationToken(userDetails, null, authorities)
                    auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request))

                    // explicitly set authentication using getter/setter (avoid Groovy property access)
                    SecurityContextHolder.getContext().setAuthentication(auth)
                }
            }
        } catch (Exception ex) {
            // log and continue filter chain so we don't break the whole request pipeline
            println("JwtAuthenticationFilter error: ${ex.class.name} - ${ex.message}")
            ex.printStackTrace()
            // make sure to clear any partial authentication
            SecurityContextHolder.clearContext()
        }

        filterChain.doFilter(request, response)
    }
}
