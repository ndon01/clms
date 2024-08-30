package com.teamiq.api.authentication.passwords.service;

import com.teamiq.api.authentication.passwords.components.PasswordHashingComponent;
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
