package com.clms.api.questionBank.repositories;

import com.clms.api.questionBank.models.QuestionBankCategory;
import com.clms.api.questionBank.models.QuestionBankQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionBankQuestionRepository extends JpaRepository<QuestionBankQuestion,Integer> {
}
