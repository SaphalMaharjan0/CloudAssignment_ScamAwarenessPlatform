package com.example.cloudbackend.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "scam_reports")
public class ScamReport {
    @Id
    private String id;
    @Column(nullable = false)
    private String title;
    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
    @ManyToOne
    @JoinColumn(name = "reporter_id")
    private User reporter;
    private String priority = "Medium";
    private String status = "Pending";
    @Column(name = "scammer_details", columnDefinition = "TEXT")
    private String scammerDetails;
    @Column(name = "financial_loss")
    private Double financialLoss = 0.0;
    @Column(name = "platform_used")
    private String platformUsed;
    @ElementCollection
    @CollectionTable(name = "scam_report_documents", joinColumns = @JoinColumn(name = "scam_report_id"))
    @Column(name = "document_url", columnDefinition = "TEXT")
    private List<String> documentUrls;
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();
    @PreUpdate
    protected void onUpdate() { updatedAt = LocalDateTime.now(); }
}
