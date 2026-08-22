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
        
        List<com.example.cloudbackend.entity.ScamReport> allReports = scamReportRepository.findAll();
        List<User> allUsers = userRepository.findAll();
        
        // Generate last 6 months names
        List<Map<String, Object>> reportData = new ArrayList<>();
        List<Map<String, Object>> userGrowthData = new ArrayList<>();
        java.time.LocalDate now = java.time.LocalDate.now();
        java.time.format.DateTimeFormatter formatter = java.time.format.DateTimeFormatter.ofPattern("MMM");
        
        for (int i = 5; i >= 0; i--) {
            java.time.LocalDate monthDate = now.minusMonths(i);
            String monthName = monthDate.format(formatter);
            int monthValue = monthDate.getMonthValue();
            int yearValue = monthDate.getYear();
            
            long reportCount = allReports.stream().filter(r -> 
                r.getCreatedAt() != null && 
                r.getCreatedAt().getMonthValue() == monthValue && 
                r.getCreatedAt().getYear() == yearValue
            ).count();
            
            long userCount = allUsers.stream().filter(u -> 
                u.getCreatedAt() != null && 
                u.getCreatedAt().getMonthValue() == monthValue && 
                u.getCreatedAt().getYear() == yearValue
            ).count();
            
            // Note: For user growth, usually it's cumulative, but for simplicity we'll show new users per month or we can show cumulative. Let's show cumulative.
            long cumulativeUsers = allUsers.stream().filter(u -> 
                u.getCreatedAt() == null || 
                u.getCreatedAt().toLocalDate().isBefore(monthDate.plusMonths(1).withDayOfMonth(1))
            ).count();
            
            reportData.add(Map.of("name", monthName, "reports", reportCount));
            userGrowthData.add(Map.of("name", monthName, "users", cumulativeUsers));
        }
        
        stats.setReportData(reportData);
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
