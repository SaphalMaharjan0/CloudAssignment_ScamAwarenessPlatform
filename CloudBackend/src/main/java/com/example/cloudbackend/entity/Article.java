package com.example.cloudbackend.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "articles")
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String title;
    @Column(unique = true, nullable = false)
    private String slug;
    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
    @ManyToOne
    @JoinColumn(name = "author_id")
    private User author;
    @Column(name = "cover_image_url", columnDefinition = "TEXT")
    private String coverImageUrl;
    @Column(name = "views_count")
    private Integer viewsCount = 0;
    @Column(name = "read_time_minutes")
    private Integer readTimeMinutes = 5;
    private String status = "Draft";
    @Column(name = "published_at")
    private LocalDateTime publishedAt;
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();
    @PreUpdate
    protected void onUpdate() { updatedAt = LocalDateTime.now(); }
}
