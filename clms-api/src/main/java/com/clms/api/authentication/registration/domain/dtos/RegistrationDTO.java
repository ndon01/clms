package com.clms.api.authentication.registration.domain.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class RegistrationDTO {
    private String emailAddress;
    private String password;
}
