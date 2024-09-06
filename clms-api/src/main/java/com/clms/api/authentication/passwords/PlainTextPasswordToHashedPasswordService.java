package com.clms.api.authentication.passwords;

import com.clms.api.authentication.passwords.PasswordHashingComponent;
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
