package com.clms.api.assignments.api.repository;

import com.clms.api.assignments.api.entity.AssignmentQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssignmentQuestionRepository extends JpaRepository<AssignmentQuestion, Integer> {

}
