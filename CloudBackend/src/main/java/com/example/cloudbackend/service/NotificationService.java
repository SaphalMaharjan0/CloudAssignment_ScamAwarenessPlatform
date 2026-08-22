package com.example.cloudbackend.service;

import com.example.cloudbackend.entity.Notification;
import com.example.cloudbackend.entity.ScamReport;
import com.example.cloudbackend.entity.User;
import com.example.cloudbackend.enums.Role;
import com.example.cloudbackend.repository.NotificationRepository;
import com.example.cloudbackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final NotificationRepository repository;
    private final UserRepository userRepository;
    private final JavaMailSender mailSender;

    public List<Notification> findAll() { return repository.findAll(); }
    public Notification save(Notification n) { return repository.save(n); }

    @Async
    public void notifyAdminsOfNewReport(ScamReport report) {
        List<User> admins = userRepository.findByRole(Role.ADMIN);
        String subject = "New Scam Report Submitted";
        String reporterName = (report.getReporter() != null) ? report.getReporter().getName() : "Anonymous";
        String messageText = "A new scam report titled '" + report.getTitle() + "' has been submitted by " + reporterName + ". Please review it in the admin dashboard.";
        String actionUrl = "/admin/reports";

        for (User admin : admins) {
            createAndSend(admin, subject, messageText, actionUrl, "info");
        }
    }

    @Async
    public void notifyAllUsersOfHighRiskReport(ScamReport report) {
        List<User> users = userRepository.findAll();
        String subject = "High Risk Scam Alert: " + report.getTitle();
        String messageText = "A new high risk scam has been verified: " + report.getTitle() + ".\n\n" +
            "Platform Used: " + report.getPlatformUsed() + "\n" +
            "Description: " + report.getDescription() + "\n\n" +
            "Please stay safe and review the report details on our platform.";
        String actionUrl = "/database"; 

        for (User user : users) {
            createAndSend(user, subject, messageText, actionUrl, "warning");
        }
    }

    private void createAndSend(User user, String subject, String messageText, String actionUrl, String type) {
        // Save in-app notification
        Notification n = new Notification();
        n.setUser(user);
        n.setTitle(subject);
        n.setMessage(messageText);
        n.setType(type); 
        n.setActionUrl(actionUrl);
        repository.save(n);

        // Send email
        if (user.getEmail() != null && !user.getEmail().isEmpty()) {
            try {
                SimpleMailMessage message = new SimpleMailMessage();
                message.setFrom("saphalmhj123@gmail.com");
                message.setTo(user.getEmail());
                message.setSubject(subject);
                message.setText(messageText);
                mailSender.send(message);
            } catch (Exception e) {
                System.err.println("Failed to send notification email to " + user.getEmail() + ": " + e.getMessage());
            }
        }
    }
}
