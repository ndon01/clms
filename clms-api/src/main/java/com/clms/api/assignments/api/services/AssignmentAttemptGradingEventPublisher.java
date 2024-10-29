package com.clms.api.assignments.api.services;

import com.clms.api.assignments.api.events.AssignmentAttemptGradingEvent;
import com.clms.api.assignments.attempts.models.AssignmentAttempt;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AssignmentAttemptGradingEventPublisher {
    private final ApplicationEventPublisher applicationEventPublisher;

    public void publish(AssignmentAttemptGradingEvent event) {
        applicationEventPublisher.publishEvent(event);
    }

    public void publish(String attemptId) {
        AssignmentAttemptGradingEvent event = AssignmentAttemptGradingEvent.builder()
                .attemptId(attemptId)
                .build();
        publish(event);
    }
}
