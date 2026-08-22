package com.example.cloudbackend.service;

import com.example.cloudbackend.dto.auth.AuthResponse;
import com.example.cloudbackend.dto.auth.LoginRequest;
import com.example.cloudbackend.dto.auth.RegisterRequest;
import com.example.cloudbackend.entity.User;
import com.example.cloudbackend.repository.UserRepository;
import com.example.cloudbackend.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;
    
    public AuthResponse register(RegisterRequest request) {
        var user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        repository.save(user);
        var jwt = jwtUtil.generateToken(user);
        return new AuthResponse(jwt, user);
    }
    
    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        var user = repository.findByEmail(request.getEmail()).orElseThrow();
        var jwt = jwtUtil.generateToken(user);
        return new AuthResponse(jwt, user);
    }
    
    public void forgotPassword(String email) {
        var userOptional = repository.findByEmail(email);
        if (userOptional.isPresent()) {
            var user = userOptional.get();
            // Generate 6 digit OTP
            String otp = String.format("%06d", new java.util.Random().nextInt(999999));
            user.setResetOtp(otp);
            user.setResetOtpExpiry(java.time.LocalDateTime.now().plusMinutes(10));
            repository.save(user);
            
            // In a real app, use JavaMailSender here.
            System.out.println("==================================================");
            System.out.println("PASSWORD RESET OTP FOR " + email + ": " + otp);
            System.out.println("==================================================");
        }
    }
    
    public boolean verifyOtp(String email, String otp) {
        var userOptional = repository.findByEmail(email);
        if (userOptional.isPresent()) {
            var user = userOptional.get();
            if (user.getResetOtp() != null && user.getResetOtp().equals(otp)) {
                if (user.getResetOtpExpiry() != null && user.getResetOtpExpiry().isAfter(java.time.LocalDateTime.now())) {
                    return true;
                }
            }
        }
        return false;
    }
    
    public void resetPassword(String email, String otp, String newPassword) {
        if (verifyOtp(email, otp)) {
            var user = repository.findByEmail(email).get();
            user.setPasswordHash(passwordEncoder.encode(newPassword));
            user.setResetOtp(null);
            user.setResetOtpExpiry(null);
            repository.save(user);
        } else {
            throw new RuntimeException("Invalid or expired OTP");
        }
    }
}
