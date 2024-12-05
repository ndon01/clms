package com.clms.api.questionBank.api.repositories;

import com.clms.api.questionBank.api.entity.QuestionBankCategory;
import com.clms.api.questionBank.api.entity.QuestionBankQuestion;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public interface QuestionBankQuestionRepository extends JpaRepository<QuestionBankQuestion,Integer> {

    List<QuestionBankQuestion> findAllByCategories(QuestionBankCategory category);

    long count();
    List<QuestionBankQuestion> findAllByCategoriesIn(List<QuestionBankCategory> categories, PageRequest pageable);
    long countAllByCategoriesIn(List<QuestionBankCategory> categories);
}
