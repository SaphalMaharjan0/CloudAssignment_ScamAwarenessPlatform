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
    public List<ScamReport> findAll() { return repository.findAll(); }
    public java.util.Optional<ScamReport> findById(String id) { return repository.findById(id); }
    public ScamReport save(ScamReport report) { 
        if (report.getId() == null) report.setId("RPT-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        return repository.save(report); 
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
        existing.setStatus(status);
        if (adminFeedback != null) {
            existing.setAdminFeedback(adminFeedback);
        }
        return repository.save(existing);
    }
}
