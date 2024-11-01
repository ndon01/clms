package com.clms.api.questions;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "question-generation-configuration")
@Data
public class QuestionGenerationConfiguration {

    private boolean enabled;

}

