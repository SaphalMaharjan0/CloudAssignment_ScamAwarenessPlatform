package com.example.cloudbackend.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "platform_settings")
public class PlatformSetting {
    @Id
    private String key;
    @Column(columnDefinition = "TEXT")
    private String value;
    private String description;
    @ManyToOne
    @JoinColumn(name = "updated_by")
    private User updatedBy;
    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();
    @PreUpdate
    protected void onUpdate() { updatedAt = LocalDateTime.now(); }
}
