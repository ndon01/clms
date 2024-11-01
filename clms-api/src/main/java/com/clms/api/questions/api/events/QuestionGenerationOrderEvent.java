package com.clms.api.questions.api.events;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class QuestionGenerationOrderEvent {
    private int questionGenerationOrderId;
    private int attempt = 0;
}
