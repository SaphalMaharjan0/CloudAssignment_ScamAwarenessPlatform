package com.example.cloudbackend.dto.auth;

import lombok.Data;

@Data
public class UpdateProfileRequest {
    private String name;
    private String currentPassword;
    private String newPassword;
}
