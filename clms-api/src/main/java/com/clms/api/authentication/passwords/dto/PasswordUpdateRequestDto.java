package com.clms.api.authentication.passwords.dto;

import lombok.Data;

@Data
public class PasswordUpdateRequestDto
{
    private String newPassword;
    private String currentPassword;
}