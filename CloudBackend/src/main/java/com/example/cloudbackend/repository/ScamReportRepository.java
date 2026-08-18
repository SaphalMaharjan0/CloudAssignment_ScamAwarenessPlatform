package com.example.cloudbackend.repository;

import com.example.cloudbackend.entity.ScamReport;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ScamReportRepository extends JpaRepository<ScamReport, String> {
    long countByStatus(String status);
    List<ScamReport> findTop5ByStatusOrderByCreatedAtDesc(String status);
}
