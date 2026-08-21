package com.example.cloudbackend.service;

import com.example.cloudbackend.entity.ReportEvidence;
import com.example.cloudbackend.repository.ReportEvidenceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReportEvidenceService {
    private final ReportEvidenceRepository repository;
    public ReportEvidence save(ReportEvidence evidence) { return repository.save(evidence); }
}
