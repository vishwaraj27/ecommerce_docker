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

        // Local Angular (dev)
        config.addAllowedOrigin("http://localhost:4200")

        // Docker frontend (when testing locally)
        config.addAllowedOrigin("http://localhost")

        // 🌍 YOUR EC2 FRONTEND (Elastic IP)
        config.addAllowedOrigin("http://3.108.100.219")

          // 🌍 Production domain (IMPORTANT: scheme must match exactly)
        config.addAllowedOrigin("https://vancart.in")
        config.addAllowedOrigin("https://www.vancart.in")  // if you ever use www

        // Allow all headers and methods
        config.addAllowedHeader("*")
        config.addAllowedMethod("*")

        def source = new UrlBasedCorsConfigurationSource()
        source.registerCorsConfiguration("/**", config)

        return new CorsFilter(source)
    }
}
