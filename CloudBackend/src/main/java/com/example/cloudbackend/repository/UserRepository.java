package com.example.cloudbackend.repository;

import com.example.cloudbackend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    java.util.List<User> findByRole(com.example.cloudbackend.enums.Role role);
}
