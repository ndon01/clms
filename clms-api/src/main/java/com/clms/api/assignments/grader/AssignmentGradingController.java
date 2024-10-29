package com.clms.api.assignments.grader;

import com.clms.api.assignments.api.events.AssignmentAttemptGradingEvent;
import com.clms.api.assignments.attempts.AssignmentAttemptRepository;
import com.clms.api.assignments.attempts.models.AssignmentAttempt;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class AssignmentGradingController {
    private final AssignmentAttemptRepository attemptRepository;
    private final AssignmentGradingService assignmentGradingService;
    @EventListener
    @Transactional
    public void gradeAssignmentAttempt(AssignmentAttemptGradingEvent event) {
        String attemptId = event.getAttemptId();
        log.info("Grading assignment attempt-{}", attemptId);
        AssignmentAttempt attempt = attemptRepository.findById(UUID.fromString(attemptId)).orElse(null);
        if (attempt == null) {
            throw new RuntimeException("Attempt not found, attempt-id: " + attemptId);
        }

        assignmentGradingService.grade(attempt);
    }
}

