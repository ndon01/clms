package com.clms.api.questionBank.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.Set;

@Entity
@Table(name = "question_bank_categories")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class QuestionBankCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String categoryName;
    private Integer parentId;
    @ManyToMany
    @JoinTable(
            name = "question_bank_question_category_mapping",
            inverseJoinColumns = @JoinColumn(name = "question_bank_question_id"),
            joinColumns = @JoinColumn(name = "question_bank_category_id")
    )
    private List<QuestionBankQuestion> associatedQuestions; 

}
