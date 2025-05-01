package com.saurabh.student;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration // Tells Spring this class contains configuration settings
public class CorsConfig {

    @Bean // Creates a Spring bean for CORS configuration
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                // This configures CORS globally for all controllers ("/**")
                registry.addMapping("/**")
                        // Allow requests specifically from your Angular app's origin
//                        .allowedOrigins("http://localhost:4200")
                        .allowedOrigins("https://wonderful-mermaid-d25886.netlify.app")
                        // Allow the HTTP methods your Angular app will use
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        // Allow all headers sent by the Angular app/browser
                        .allowedHeaders("*")
                        // Allow credentials (like cookies or auth tokens) if needed later
                        .allowCredentials(true);
            }
        };
    }
}