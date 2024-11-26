package com.clms.api.questionBank.repositories;

import com.clms.api.assignments.AssignmentQuestion;
import com.clms.api.questionBank.entity.QuestionBankCategory;
import com.clms.api.questionBank.entity.QuestionBankQuestion;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.awt.print.Pageable;
import java.util.List;

@Repository
public interface QuestionBankQuestionRepository extends JpaRepository<QuestionBankQuestion,Integer> {
    long count();
    List<QuestionBankQuestion> findAllByCategoriesIn(List<QuestionBankCategory> categories, PageRequest pageable);
}
