package com.clms.api.assignments.attempts;

import com.clms.api.assignments.Assignment;
import com.clms.api.assignments.AssignmentRepository;
import com.clms.api.assignments.attempts.models.AssignmentAttempt;
import com.clms.api.assignments.attempts.models.AssignmentAttemptStatus;
import com.clms.api.common.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AssignmentAttemptService {
    private final AssignmentRepository assignmentRepository;
    private final AssignmentAttemptRepository assignmentAttemptRepository;
    public AssignmentAttempt getActiveAttemptsForUserByAssignmentID(User user, Integer assignmentId) {
        Assignment assignment = assignmentRepository.findById(assignmentId).orElseThrow();
        AssignmentAttempt assignmentAttempt = assignmentAttemptRepository.findAssignmentAttemptByUserAndAssignment(user, assignment)
                .stream()
                .filter(attempt -> attempt.getStatus() == AssignmentAttemptStatus.IN_PROGRESS)
                .findFirst()
                .orElseThrow();
        return assignmentAttempt;
    }
}
