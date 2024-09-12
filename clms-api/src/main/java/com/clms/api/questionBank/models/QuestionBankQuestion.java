package com.clms.api.questionBank.models;

import com.clms.api.authorization.Permission;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;
import java.util.Set;

@Entity
@Table(name = "question_bank_questions")
@Data
public class QuestionBankQuestion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String questionName;

    @Column
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "question_bank_question_category_mapping",
            joinColumns = @JoinColumn(name = "question_bank_question_id"),
            inverseJoinColumns = @JoinColumn(name = "question_bank_category_id")
    )
    private List<QuestionBankCategory> categories;
}
