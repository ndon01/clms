package com.clms.api.questions.api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GeneratedAnswerDTO {
    private String text;
    private boolean correct;

    // Getters and setters
}
