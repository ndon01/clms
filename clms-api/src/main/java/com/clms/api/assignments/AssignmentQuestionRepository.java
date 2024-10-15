package com.clms.api.assignments;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssignmentQuestionRepository extends JpaRepository<AssignmentQuestion, Integer> {

}
