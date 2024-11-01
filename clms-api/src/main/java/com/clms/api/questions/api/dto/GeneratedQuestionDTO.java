package com.clms.api.questions.api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GeneratedQuestionDTO {
    private String title;
    private String question;
    private List<GeneratedAnswerDTO> answers;

    // Getters and setters
}
