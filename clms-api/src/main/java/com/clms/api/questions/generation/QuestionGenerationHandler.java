package com.clms.api.questions.generation;

import com.clms.api.questions.api.entity.QuestionGenerationOrderEntity;

public interface QuestionGenerationHandler {
    boolean canHandle(QuestionGenerationOrderEntity order);
    void handle(QuestionGenerationOrderEntity order);
}
