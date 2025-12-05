package com.vishwa.ecommerce_backend.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.UrlBasedCorsConfigurationSource
import org.springframework.web.filter.CorsFilter

@Configuration
class CorsConfig {

    @Bean
    CorsFilter corsFilter() {
        def config = new CorsConfiguration()
        config.setAllowCredentials(true)

        // Allow local Angular (dev)
        config.addAllowedOrigin("http://localhost:4200")

        // Allow Docker frontend (Nginx)
        config.addAllowedOrigin("http://localhost")

        // Future domain (optional)
        // config.addAllowedOrigin("https://yourdomain.com")

        // Allow all headers & methods
        config.addAllowedHeader("*")
        config.addAllowedMethod("*")

        def source = new UrlBasedCorsConfigurationSource()
        source.registerCorsConfiguration("/**", config)

        return new CorsFilter(source)
    }
}
