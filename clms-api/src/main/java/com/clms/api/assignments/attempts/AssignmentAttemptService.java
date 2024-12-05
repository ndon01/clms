package com.clms.api.assignments.attempts;

import com.clms.api.assignments.api.entity.Assignment;
import com.clms.api.assignments.api.repository.AssignmentRepository;
import com.clms.api.assignments.attempts.models.AssignmentAttempt;
import com.clms.api.assignments.attempts.models.AssignmentAttemptStatus;
import com.clms.api.users.api.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AssignmentAttemptService {
    private final AssignmentRepository assignmentRepository;
    private final AssignmentAttemptRepository assignmentAttemptRepository;
    public AssignmentAttempt getActiveAttemptsForUserByAssignmentID(User user, Integer assignmentId) {
        Assignment assignment = assignmentRepository.findById(assignmentId).orElseThrow();
        List<AssignmentAttempt> attempts = assignmentAttemptRepository.findAssignmentAttemptsByUserAndAssignment(user, assignment);
        AssignmentAttempt assignmentAttempt = attempts.stream()
                .filter(attempt -> attempt.getStatus() == AssignmentAttemptStatus.IN_PROGRESS)
                .findFirst()
                .orElseThrow();
        return assignmentAttempt;
    }
}
