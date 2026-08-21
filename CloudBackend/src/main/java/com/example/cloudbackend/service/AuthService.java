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
}
