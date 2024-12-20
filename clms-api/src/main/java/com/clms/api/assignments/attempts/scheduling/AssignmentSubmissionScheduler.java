package com.clms.api.assignments.attempts.scheduling;

import com.clms.api.assignments.api.entity.Assignment;
import com.clms.api.assignments.api.services.AssignmentAttemptGradingEventPublisher;
import com.clms.api.assignments.grader.AssignmentGradingService;
import com.clms.api.assignments.attempts.models.AssignmentAttempt;
import com.clms.api.assignments.attempts.AssignmentAttemptRepository;
import com.clms.api.assignments.attempts.models.AssignmentAttemptStatus;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class AssignmentSubmissionScheduler {

    private final AssignmentAttemptRepository assignmentAttemptRepository;
    private final AssignmentGradingService assignmentAttemptGradingService;
    private final AssignmentAttemptGradingEventPublisher assignmentAttemptGradingEventPublisher;

    @Scheduled(fixedRate = 30000)
    @Transactional
    public void scheduleFixedRateTask() {
        log.info("Checking for assignment attempts that are past due date and grading");

        List<AssignmentAttempt> assignmentAttempts = assignmentAttemptRepository.findAssignmentAttemptsByStatus(AssignmentAttemptStatus.IN_PROGRESS);

        Date now = new Date();
        //looping through all in progress attempts
        for (AssignmentAttempt assignmentAttempt : assignmentAttempts) {
            log.info("Checking assignment attempt {}", assignmentAttempt.getId());
            Assignment assignment = assignmentAttempt.getAssignment();
            boolean submitted = false;
            // past due date
            if (assignment.getDueDate().before(now)) {
                log.info("Assignment attempt {} is past due.", assignmentAttempt.getId());

                assignmentAttempt.setStatus(AssignmentAttemptStatus.SUBMITTED);
                assignmentAttemptRepository.saveAndFlush(assignmentAttempt);
                submitted = true;
            }

            // time limit exceeded
            if (assignment.getTimeLimitMinutes() > 0) {
                Duration differenceBetween = Duration.between(Instant.now(), assignmentAttempt.getStartedAt());
                long timeElapsed = differenceBetween.toSeconds();
                if (timeElapsed > assignment.getTimeLimitMinutes()) {
                    log.info("Assignment attempt {} exceeded time limit.", assignmentAttempt.getId());
                    assignmentAttempt.setStatus(AssignmentAttemptStatus.SUBMITTED);
                    assignmentAttemptRepository.saveAndFlush(assignmentAttempt);
                    submitted = true;
                }

            }
            //grade the assignment
            if(submitted) {
                assignmentAttemptGradingEventPublisher.publish(assignmentAttempt.getId().toString());
                log.info("Assignment attempt {} graded.", assignmentAttempt.getId());
            }

        }
    }
}
