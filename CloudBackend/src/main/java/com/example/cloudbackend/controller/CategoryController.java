package com.example.cloudbackend.controller;

import com.example.cloudbackend.entity.Category;
import com.example.cloudbackend.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService service;
    @GetMapping
    public ResponseEntity<List<Category>> getAll() { return ResponseEntity.ok(service.findAll()); }
    @PostMapping
    public ResponseEntity<Category> create(@RequestBody Category category) { return ResponseEntity.ok(service.save(category)); }
}
