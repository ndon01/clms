package com.clms.api.assignments.attempts;

import com.clms.api.assignments.Assignment;
import com.clms.api.common.domain.User;
import org.hibernate.query.NativeQuery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


import java.util.UUID;

@Repository
public interface AssignmentAttemptRepository extends JpaRepository<AssignmentAttempt, UUID> {
    List<AssignmentAttempt> findByUser(User user);
    List<AssignmentAttempt> findAssignmentAttemptByUserAndAssignment(User user, Assignment assignment);
}