package com.clms.api.authentication.api.services;

import com.clms.api.authentication.api.services.PasswordHashingComponent;
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
