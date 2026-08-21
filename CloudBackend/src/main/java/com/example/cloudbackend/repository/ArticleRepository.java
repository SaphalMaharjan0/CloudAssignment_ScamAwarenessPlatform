package com.example.cloudbackend.repository;

import com.example.cloudbackend.entity.Article;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleRepository extends JpaRepository<Article, Long> {}
