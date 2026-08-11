package com.scamplatform.controller;

import com.scamplatform.entity.ScamCategory;
import com.scamplatform.repository.ScamCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Basic CRUD Controller to verify database connectivity.
 * Crucial for demonstrating working end-to-end RDS connection in the assignment.
 */
@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "*") // Allow frontend to call this API
public class ScamCategoryController {

    @Autowired
    private ScamCategoryRepository repository;

    @GetMapping
    public List<ScamCategory> getAllCategories() {
        return repository.findAll();
    }

    @PostMapping
    public ScamCategory createCategory(@RequestBody ScamCategory category) {
        return repository.save(category);
    }
}
