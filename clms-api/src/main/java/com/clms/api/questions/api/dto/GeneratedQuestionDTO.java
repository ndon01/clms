package com.clms.api.questions.api.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Schema(name = "GeneratedQuestion", description = "A question generated from a video")
public class GeneratedQuestionDTO {
    private String title;
    private String question;
    private List<GeneratedAnswerDTO> answers;
}
