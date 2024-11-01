package com.clms.api.questions.api.events.services;

import com.clms.api.questions.api.events.QuestionGenerationOrderEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class QuestionGenerationOrderEventPublication {
    private final ApplicationEventPublisher applicationEventPublisher;

    public void publish(QuestionGenerationOrderEvent questionGenerationOrderEvent) {
        applicationEventPublisher.publishEvent(questionGenerationOrderEvent);
    }

}
