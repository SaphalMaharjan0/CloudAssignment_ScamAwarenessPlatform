package com.example.cloudbackend.controller;

import com.example.cloudbackend.dto.auth.UpdateProfileRequest;
import com.example.cloudbackend.entity.User;
import com.example.cloudbackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @PutMapping("/me")
    public ResponseEntity<?> updateProfile(@RequestBody UpdateProfileRequest request) {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!(principal instanceof UserDetails)) {
            return ResponseEntity.status(401).body("Unauthorized");
        }
        
        String email = ((UserDetails) principal).getUsername();
        return userRepository.findByEmail(email).map(user -> {
            if (request.getName() != null && !request.getName().isBlank()) {
                user.setName(request.getName());
            }
            
            if (request.getNewPassword() != null && !request.getNewPassword().isBlank()) {
                if (request.getCurrentPassword() == null || !passwordEncoder.matches(request.getCurrentPassword(), user.getPasswordHash())) {
                    return ResponseEntity.badRequest().body("Incorrect current password.");
                }
                user.setPasswordHash(passwordEncoder.encode(request.getNewPassword()));
            }
            
            User savedUser = userRepository.save(user);
            return ResponseEntity.ok(savedUser);
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
