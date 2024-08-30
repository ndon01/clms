package com.clms.api.authentication.passwords.components;

import com.clms.api.authentication.passwords.config.PasswordConfiguration;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class PasswordHashingComponent {

    private final PasswordConfiguration passwordConfiguration;

    public String hash(String password) {
        log.info("Hashing password with strength: {}", passwordConfiguration.getStrength());
        String salt = BCrypt.gensalt(passwordConfiguration.getStrength());
        return BCrypt.hashpw(password, salt);
    }


    public boolean match(String plainText, String hash) {
        return BCrypt.checkpw(plainText, hash);
    }

}
