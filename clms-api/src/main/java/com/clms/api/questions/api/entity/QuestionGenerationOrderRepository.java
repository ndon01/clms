package com.clms.api.questions.api.entity;

import com.clms.api.users.api.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface QuestionGenerationOrderRepository extends JpaRepository<QuestionGenerationOrderEntity, Integer> {
    List<QuestionGenerationOrderEntity> findAllByOrderedBy(User orderedBy);
}
