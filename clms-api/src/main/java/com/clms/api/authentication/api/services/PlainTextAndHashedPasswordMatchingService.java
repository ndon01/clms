package com.clms.api.authentication.api.services;

import com.clms.api.authentication.api.services.PasswordHashingComponent;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PlainTextAndHashedPasswordMatchingService {
    private final PasswordHashingComponent passwordEncryptionComponent;
    public boolean match(String plainText, String hashedPassword) {
        return passwordEncryptionComponent.match(plainText, hashedPassword);
    }
}
