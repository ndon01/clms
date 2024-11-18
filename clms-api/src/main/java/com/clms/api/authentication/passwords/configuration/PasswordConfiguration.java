package com.clms.api.authentication.passwords.configuration;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties("clms.password")
@Data
public class PasswordConfiguration {
    private int strength;
}
