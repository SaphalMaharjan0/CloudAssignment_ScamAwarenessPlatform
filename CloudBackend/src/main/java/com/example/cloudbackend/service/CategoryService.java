package com.example.cloudbackend.service;

import com.example.cloudbackend.entity.Category;
import com.example.cloudbackend.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository repository;
    public List<Category> findAll() { return repository.findAll(); }
    public Category save(Category category) { return repository.save(category); }
}
