package com.example.cloudbackend.service;

import com.example.cloudbackend.entity.PlatformSetting;
import com.example.cloudbackend.repository.PlatformSettingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PlatformSettingService {
    private final PlatformSettingRepository repository;
    public List<PlatformSetting> findAll() { return repository.findAll(); }
    public PlatformSetting save(PlatformSetting ps) { return repository.save(ps); }
}
