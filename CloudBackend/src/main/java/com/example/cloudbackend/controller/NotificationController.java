package com.example.cloudbackend.controller;

import com.example.cloudbackend.entity.Notification;
import com.example.cloudbackend.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {
    private final NotificationService service;
    @GetMapping
    public ResponseEntity<List<Notification>> getAll() { return ResponseEntity.ok(service.findAll()); }
    @PostMapping
    public ResponseEntity<Notification> create(@RequestBody Notification n) { return ResponseEntity.ok(service.save(n)); }
}
