package com.clms.api.courses.reinforcementLearning.entity;

import com.clms.api.users.api.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "category_reinforcement_question_attempts")
@Getter
@Setter
public class CategoryReinforcementQuestionAttempt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "course_id")
    private Integer courseId; // Nullable

    @Column(name = "question_id", nullable = false)
    private int questionId;

    @Column(name = "attempt_data", nullable = false, columnDefinition = "jsonb")
    private String attemptData;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
}
