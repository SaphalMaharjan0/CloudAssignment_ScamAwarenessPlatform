package com.example.cloudbackend.controller;

import com.example.cloudbackend.entity.PlatformSetting;
import com.example.cloudbackend.service.PlatformSettingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/admin/settings")
@RequiredArgsConstructor
public class PlatformSettingController {
    private final PlatformSettingService service;
    @GetMapping
    public ResponseEntity<List<PlatformSetting>> getAll() { return ResponseEntity.ok(service.findAll()); }
    @PostMapping
    public ResponseEntity<PlatformSetting> save(@RequestBody PlatformSetting ps) { return ResponseEntity.ok(service.save(ps)); }
}
