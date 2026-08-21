package com.example.cloudbackend.controller;

import com.example.cloudbackend.entity.ScamReport;
import com.example.cloudbackend.service.ScamReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import com.example.cloudbackend.repository.UserRepository;
import java.util.List;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
public class ScamReportController {
    private final ScamReportService service;
    private final UserRepository userRepository;
    
    @GetMapping
    public ResponseEntity<List<ScamReport>> getAll() { return ResponseEntity.ok(service.findAll()); }
    
    @GetMapping("/{id}")
    public ResponseEntity<ScamReport> getById(@PathVariable String id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<ScamReport> create(@RequestBody ScamReport report, @AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails != null && report.getReporter() == null) {
            userRepository.findByEmail(userDetails.getUsername()).ifPresent(report::setReporter);
        }
        return ResponseEntity.ok(service.save(report));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable String id, @RequestBody ScamReport report, @AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) return ResponseEntity.status(401).build();
        try {
            return ResponseEntity.ok(service.update(id, report, userDetails.getUsername()));
        } catch (IllegalStateException | IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable String id, @AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) return ResponseEntity.status(401).build();
        try {
            service.delete(id, userDetails.getUsername());
            return ResponseEntity.ok().build();
        } catch (IllegalStateException | IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
