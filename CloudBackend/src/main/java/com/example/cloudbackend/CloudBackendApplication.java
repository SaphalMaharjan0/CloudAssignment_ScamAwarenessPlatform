package com.example.cloudbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;

import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class CloudBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(CloudBackendApplication.class, args);
    }
    
    @Bean
    public CommandLineRunner run(JdbcTemplate jdbcTemplate) {
        return args -> {
            try {
                jdbcTemplate.execute("ALTER TABLE articles ALTER COLUMN cover_image_url TYPE TEXT");
                System.out.println("Altered cover_image_url column to TEXT successfully.");
            } catch (Exception e) {
                System.out.println("Could not alter column (might already be TEXT or not exist yet): " + e.getMessage());
            }
        };
    }

}
