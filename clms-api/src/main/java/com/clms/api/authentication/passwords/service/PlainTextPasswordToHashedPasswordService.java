package com.clms.api.authentication.passwords.service;

import com.clms.api.authentication.passwords.components.PasswordHashingComponent;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PlainTextPasswordToHashedPasswordService {
    private final PasswordHashingComponent passwordEncryptionComponent;
    public String convert(String password) {
        return passwordEncryptionComponent.hash(password);
    }
}
