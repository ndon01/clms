package com.clms.api.courses.reinforcementLearning.repository;

import com.clms.api.courses.reinforcementLearning.entity.CategoryReinforcementAssignedQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryReinforcementAssignedQuestionRepository extends JpaRepository<CategoryReinforcementAssignedQuestion, Integer> {
}
