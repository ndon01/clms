package com.clms.api.assignments.attempts;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface AssignmentQuestionAttemptRepository extends JpaRepository<AssignmentQuestionAttempt, UUID> {
}
