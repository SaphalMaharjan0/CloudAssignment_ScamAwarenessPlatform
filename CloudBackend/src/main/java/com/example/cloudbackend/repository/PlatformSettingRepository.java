package com.example.cloudbackend.repository;

import com.example.cloudbackend.entity.PlatformSetting;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlatformSettingRepository extends JpaRepository<PlatformSetting, String> {}
