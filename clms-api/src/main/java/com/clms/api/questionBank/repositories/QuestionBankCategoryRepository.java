package com.clms.api.questionBank.repositories;

import com.clms.api.questionBank.models.QuestionBankCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionBankCategoryRepository extends JpaRepository<QuestionBankCategory,Integer> {
}
