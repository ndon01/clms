package com.clms.api.questions.api.dto;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/generatedQuestionDummy")
public class GeneratedQuestionDummy {
    @GetMapping("/generated-question-dummy")
    public GeneratedQuestionDTO getGeneratedQuestionExample() {
        // Returning null or an empty instance if you prefer, just to expose the schema.
        return new GeneratedQuestionDTO();
    }
}
