package com.example.cloudbackend.controller;

import com.example.cloudbackend.dto.AdminStatsResponse;
import com.example.cloudbackend.entity.User;
import com.example.cloudbackend.repository.ScamReportRepository;
import com.example.cloudbackend.repository.UserRepository;
import com.example.cloudbackend.service.ScamReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final UserRepository userRepository;
    private final ScamReportRepository scamReportRepository;
    private final ScamReportService scamReportService;

    @GetMapping("/stats")
    public ResponseEntity<AdminStatsResponse> getStats() {
        AdminStatsResponse stats = new AdminStatsResponse();
        stats.setTotalUsers(userRepository.count());
        stats.setTotalReports(scamReportRepository.count());
        stats.setPendingReports(scamReportRepository.countByStatus("Pending"));
        stats.setVerifiedReports(scamReportRepository.countByStatus("Verified"));
        
        stats.setLatestPendingReports(scamReportRepository.findTop5ByStatusOrderByCreatedAtDesc("Pending"));
        
        // Mock chart data for now, could be dynamic later
        List<Map<String, Object>> reportData = new ArrayList<>();
        reportData.add(Map.of("name", "Jan", "reports", 140));
        reportData.add(Map.of("name", "Feb", "reports", 180));
        reportData.add(Map.of("name", "Mar", "reports", 200));
        reportData.add(Map.of("name", "Apr", "reports", 170));
        reportData.add(Map.of("name", "May", "reports", 260));
        reportData.add(Map.of("name", "Jun", "reports", 310));
        reportData.add(Map.of("name", "Jul", "reports", 290));
        reportData.add(Map.of("name", "Aug", "reports", 330));
        reportData.add(Map.of("name", "Sep", "reports", 295));
        reportData.add(Map.of("name", "Oct", "reports", 390));
        reportData.add(Map.of("name", "Nov", "reports", 375));
        reportData.add(Map.of("name", "Dec", "reports", scamReportRepository.count())); // Use actual count for current month
        stats.setReportData(reportData);

        List<Map<String, Object>> userGrowthData = new ArrayList<>();
        userGrowthData.add(Map.of("name", "Jul", "users", 1200));
        userGrowthData.add(Map.of("name", "Aug", "users", 1600));
        userGrowthData.add(Map.of("name", "Sep", "users", 2000));
        userGrowthData.add(Map.of("name", "Oct", "users", 2400));
        userGrowthData.add(Map.of("name", "Nov", "users", 2900));
        userGrowthData.add(Map.of("name", "Dec", "users", userRepository.count() > 3000 ? userRepository.count() : 3541));
        stats.setUserGrowthData(userGrowthData);

        return ResponseEntity.ok(stats);
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody User userUpdates) {
        return userRepository.findById(id).map(user -> {
            if (userUpdates.getName() != null) user.setName(userUpdates.getName());
            if (userUpdates.getEmail() != null) user.setEmail(userUpdates.getEmail());
            if (userUpdates.getRole() != null) user.setRole(userUpdates.getRole());
            if (userUpdates.getActive() != null) user.setActive(userUpdates.getActive());
            return ResponseEntity.ok(userRepository.save(user));
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        return userRepository.findById(id).map(user -> {
            userRepository.delete(user);
            return ResponseEntity.ok().build();
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/reports/{id}/status")
    public ResponseEntity<?> updateReportStatus(@PathVariable String id, @RequestBody Map<String, String> body) {
        String status = body.get("status");
        if (status == null || status.isEmpty()) {
            return ResponseEntity.badRequest().body("Status is required");
        }
        try {
            return ResponseEntity.ok(scamReportService.updateStatus(id, status));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
