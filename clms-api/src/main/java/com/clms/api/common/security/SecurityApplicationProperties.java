package com.clms.api.common.security;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties("clms.security")
@Data
public class SecurityApplicationProperties {
    private JwtTokenSettings accessToken;
}
