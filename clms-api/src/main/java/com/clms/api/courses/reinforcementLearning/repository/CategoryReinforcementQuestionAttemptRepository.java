package com.clms.api.courses.reinforcementLearning.repository;

import com.clms.api.courses.reinforcementLearning.entity.CategoryReinforcementQuestionAttempt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryReinforcementQuestionAttemptRepository extends JpaRepository<CategoryReinforcementQuestionAttempt, Integer> {
}
