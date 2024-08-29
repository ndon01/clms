package com.teamiq.api.authentication.login.domain.dtos;

import lombok.Data;

@Data
public class LoginDto {
    private String emailAddress;
    private String password;
}
