package com.clms.api.authentication.login;

import lombok.Data;

@Data
public class LoginRequestDTO {
    private String username;
    private String password;
}
