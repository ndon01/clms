package com.clms.api.assignments.attempts;

import com.clms.api.assignments.api.entity.Assignment;
import com.clms.api.assignments.attempts.models.AssignmentAttempt;
import com.clms.api.assignments.attempts.models.AssignmentAttemptStatus;
import com.clms.api.users.api.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


import java.util.UUID;

@Repository
public interface AssignmentAttemptRepository extends JpaRepository<AssignmentAttempt, UUID> {
    List<AssignmentAttempt> findByUser(User user);
    List<AssignmentAttempt> findAssignmentAttemptsByUserAndAssignment(User user, Assignment assignment);
    List<AssignmentAttempt> findAllByAssignment(Assignment assignment);
    List<AssignmentAttempt> findAssignmentAttemptsByStatus(AssignmentAttemptStatus status);

}