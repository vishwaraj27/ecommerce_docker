package com.vishwa.ecommerce_backend.config

import com.vishwa.ecommerce_backend.security.JwtAuthenticationFilter
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter

@Configuration
class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter

    SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter
    }

    @Bean
     SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
     http
        .csrf { it.disable() }
        .cors() // ✅ enable CORS handling
        .and()
        .authorizeHttpRequests {
                    it
                 .requestMatchers("/api/auth/**").permitAll()
             .requestMatchers("/uploads/**").permitAll()   // allow images
              .requestMatchers("/api/admin/**").hasRole("ROLE_ADMIN")  // ⭐ ONLY ADMIN
              .anyRequest().authenticated()
            }

        .sessionManagement {
            it.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        }

    http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter)

    return http.build()
}


    @Bean
    PasswordEncoder passwordEncoder() {
        new BCryptPasswordEncoder()
    }

    @Bean
    AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        authConfig.authenticationManager
    }
}
