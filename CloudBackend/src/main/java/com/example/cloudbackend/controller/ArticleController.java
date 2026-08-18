package com.example.cloudbackend.controller;

import com.example.cloudbackend.entity.Article;
import com.example.cloudbackend.service.ArticleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/articles")
@RequiredArgsConstructor
public class ArticleController {
    private final ArticleService service;
    @GetMapping
    public ResponseEntity<List<Article>> getAll() { return ResponseEntity.ok(service.findAll()); }
    @PostMapping
    public ResponseEntity<Article> create(@RequestBody Article article) { return ResponseEntity.ok(service.save(article)); }

    @PutMapping("/{id}")
    public ResponseEntity<Article> update(@PathVariable Long id, @RequestBody Article article) {
        Article existing = service.findById(id);
        existing.setTitle(article.getTitle());
        existing.setContent(article.getContent());
        existing.setStatus(article.getStatus());
        existing.setCoverImageUrl(article.getCoverImageUrl());
        if (article.getCategory() != null) {
            existing.setCategory(article.getCategory());
        }
        return ResponseEntity.ok(service.save(existing));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
