package com.teamiq.api.authentication.passwords.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties("teamiq.password")
@Data
public class PasswordConfiguration {
    private int strength;
}
