package com.clms.api.adaptiveLearning;

import com.clms.api.questionBank.entity.QuestionBankCategory;
import com.clms.api.users.api.User;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "category_recommendation_data")
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CategoryReccomendationData
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @Column(name="category_frequency")
    private Long categoryFrequency = 0L;

    @ManyToOne
    @JoinColumn(name="category_id")
    private QuestionBankCategory category;

    @Column(name="category_score")
    private Long categoryScore = 0L;



}
