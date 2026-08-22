package com.example.cloudbackend.service;

import com.example.cloudbackend.entity.ScamReport;
import com.example.cloudbackend.repository.ScamReportRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ScamReportService {
    private final ScamReportRepository repository;
    private final NotificationService notificationService;

    public List<ScamReport> findAll() { return repository.findAll(); }
    public java.util.Optional<ScamReport> findById(String id) { return repository.findById(id); }
    
    public ScamReport save(ScamReport report) { 
        boolean isNew = report.getId() == null;
        if (isNew) report.setId("RPT-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        
        ScamReport saved = repository.save(report); 
        
        if (isNew) {
            notificationService.notifyAdminsOfNewReport(saved);
        }
        return saved;
    }
    public ScamReport update(String id, ScamReport updatedReport, String userEmail) {
        ScamReport existing = repository.findById(id).orElseThrow(() -> new IllegalArgumentException("Report not found"));
        if (!"Pending".equals(existing.getStatus())) {
            throw new IllegalStateException("Only pending reports can be edited");
        }
        if (existing.getReporter() != null && !existing.getReporter().getEmail().equals(userEmail)) {
            throw new IllegalStateException("You do not have permission to edit this report");
        }
        
        existing.setTitle(updatedReport.getTitle());
        existing.setDescription(updatedReport.getDescription());
        existing.setCategory(updatedReport.getCategory());
        existing.setPlatformUsed(updatedReport.getPlatformUsed());
        existing.setScammerDetails(updatedReport.getScammerDetails());
        existing.setFinancialLoss(updatedReport.getFinancialLoss());
        existing.setDocumentUrls(updatedReport.getDocumentUrls());
        
        return repository.save(existing);
    }

    public void delete(String id, String userEmail) {
        ScamReport existing = repository.findById(id).orElseThrow(() -> new IllegalArgumentException("Report not found"));
        if (!"Pending".equals(existing.getStatus())) {
            throw new IllegalStateException("Only pending reports can be deleted");
        }
        if (existing.getReporter() != null && !existing.getReporter().getEmail().equals(userEmail)) {
            throw new IllegalStateException("You do not have permission to delete this report");
        }
        
        repository.delete(existing);
    }

    public ScamReport updateStatus(String id, String status, String adminFeedback) {
        ScamReport existing = repository.findById(id).orElseThrow(() -> new IllegalArgumentException("Report not found"));
        boolean wasPending = "Pending".equals(existing.getStatus());
        existing.setStatus(status);
        if (adminFeedback != null) {
            existing.setAdminFeedback(adminFeedback);
        }
        
        ScamReport saved = repository.save(existing);
        
        // If it was just approved/verified and it's high risk, notify everyone
        if (wasPending && "Verified".equals(status) && "High".equalsIgnoreCase(existing.getPriority())) {
            notificationService.notifyAllUsersOfHighRiskReport(saved);
        }
        
        return saved;
    }
}
