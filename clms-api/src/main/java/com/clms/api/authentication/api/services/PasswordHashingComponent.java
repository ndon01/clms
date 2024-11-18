package com.clms.api.authentication.api.services;

import at.favre.lib.crypto.bcrypt.BCrypt;
import com.clms.api.authentication.api.services.PasswordConfiguration;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class PasswordHashingComponent {

    private final PasswordConfiguration passwordConfiguration;

    public String hash(String password) {
        log.info("Hashing password with strength: {}", passwordConfiguration.getStrength());
        String hash = BCrypt.withDefaults().hashToString(passwordConfiguration.getStrength(), password.toCharArray());
        return hash;
    }


    public boolean match(String plainText, String hash) {
        return BCrypt.verifyer().verify(plainText.toCharArray(), hash).verified;
    }

}
