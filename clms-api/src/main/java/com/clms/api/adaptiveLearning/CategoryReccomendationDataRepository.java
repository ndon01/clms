package com.clms.api.adaptiveLearning;

import com.clms.api.questionBank.api.entity.QuestionBankCategory;
import com.clms.api.users.api.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryReccomendationDataRepository extends JpaRepository<CategoryReccomendationData, Long> {

    Optional<CategoryReccomendationData> findByCategoryAndUser(QuestionBankCategory category, User user);
    List<CategoryReccomendationData> findAllByUserId(int userId);

}
