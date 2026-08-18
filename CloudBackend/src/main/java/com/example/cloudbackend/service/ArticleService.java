package com.example.cloudbackend.service;

import com.example.cloudbackend.entity.Article;
import com.example.cloudbackend.repository.ArticleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ArticleService {
    private final ArticleRepository repository;
    public List<Article> findAll() { return repository.findAll(); }
    public Article save(Article article) { return repository.save(article); }
    public Article findById(Long id) { return repository.findById(id).orElseThrow(() -> new RuntimeException("Article not found")); }
    public void deleteById(Long id) { repository.deleteById(id); }
}
