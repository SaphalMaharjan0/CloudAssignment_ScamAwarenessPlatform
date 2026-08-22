package com.example.cloudbackend.controller;

import com.example.cloudbackend.dto.auth.AuthResponse;
import com.example.cloudbackend.dto.auth.LoginRequest;
import com.example.cloudbackend.dto.auth.RegisterRequest;
import com.example.cloudbackend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService service;
    
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(service.register(request));
    }
    
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(service.login(request));
    }
    
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody java.util.Map<String, String> body) {
        String email = body.get("email");
        if (email != null && !email.isEmpty()) {
            service.forgotPassword(email);
        }
        return ResponseEntity.ok().build(); // Always return OK to prevent email enumeration
    }
    
    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody java.util.Map<String, String> body) {
        String email = body.get("email");
        String otp = body.get("otp");
        if (service.verifyOtp(email, otp)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().body("Invalid or expired OTP");
    }
    
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody java.util.Map<String, String> body) {
        String email = body.get("email");
        String otp = body.get("otp");
        String newPassword = body.get("newPassword");
        try {
            service.resetPassword(email, otp, newPassword);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
