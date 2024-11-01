package com.clms.api.gemini;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "gemini-configuration")
@Data
public class GeminiConfiguration {
    private boolean enabled;
    private String apiUrl;
    private String apiKey;
}
