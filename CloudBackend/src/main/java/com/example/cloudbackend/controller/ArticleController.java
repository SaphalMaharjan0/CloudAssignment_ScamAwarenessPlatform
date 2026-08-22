package com.example.cloudbackend.controller;

import com.example.cloudbackend.entity.Article;
import com.example.cloudbackend.service.ArticleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

import com.example.cloudbackend.service.NotificationService;

@RestController
@RequestMapping("/api/articles")
@RequiredArgsConstructor
public class ArticleController {
    private final ArticleService service;
    private final NotificationService notificationService;
    
    @GetMapping
    public ResponseEntity<List<Article>> getAll() { return ResponseEntity.ok(service.findAll()); }
    
    @PostMapping
    public ResponseEntity<Article> create(@RequestBody Article article) { 
        Article saved = service.save(article);
        if ("Published".equals(saved.getStatus())) {
            notificationService.notifyAllUsersOfNewArticle(saved);
        }
        return ResponseEntity.ok(saved); 
    }

    @PutMapping("/{id}")
    public ResponseEntity<Article> update(@PathVariable Long id, @RequestBody Article article) {
        Article existing = service.findById(id);
        boolean wasPublished = "Published".equals(existing.getStatus());
        
        existing.setTitle(article.getTitle());
        existing.setContent(article.getContent());
        existing.setStatus(article.getStatus());
        existing.setCoverImageUrl(article.getCoverImageUrl());
        if (article.getCategory() != null) {
            existing.setCategory(article.getCategory());
        }
        
        Article saved = service.save(existing);
        if (!wasPublished && "Published".equals(saved.getStatus())) {
            notificationService.notifyAllUsersOfNewArticle(saved);
        }
        return ResponseEntity.ok(saved);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
