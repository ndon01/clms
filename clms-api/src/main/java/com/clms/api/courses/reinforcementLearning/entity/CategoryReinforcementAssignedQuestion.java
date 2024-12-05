package com.clms.api.courses.reinforcementLearning.entity;

import com.clms.api.users.api.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "category_reinforcement_assigned_question")
@Getter
@Setter
public class CategoryReinforcementAssignedQuestion {

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

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt = LocalDateTime.now();

    // Optionally, override setters to update the `updatedAt` timestamp
    public void setQuestionId(int questionId) {
        this.questionId = questionId;
        this.updatedAt = LocalDateTime.now();
    }
}