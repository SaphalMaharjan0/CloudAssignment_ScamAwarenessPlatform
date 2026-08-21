package com.example.cloudbackend.service;

import com.example.cloudbackend.entity.Notification;
import com.example.cloudbackend.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final NotificationRepository repository;
    public List<Notification> findAll() { return repository.findAll(); }
    public Notification save(Notification n) { return repository.save(n); }
}
