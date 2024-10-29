package com.clms.api.assignments.api.events;

import com.clms.api.assignments.attempts.models.AssignmentAttempt;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class AssignmentAttemptGradingEvent {
    private String attemptId;
}
