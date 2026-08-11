package com.scamplatform.repository;

import com.scamplatform.entity.ScamCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ScamCategoryRepository extends JpaRepository<ScamCategory, Long> {
}
