package com.clms.api.questionBank.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "question_bank_categories")
@Data
public class QuestionBankCategory{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String categoryName;
    @Column
@OneToMany(fetch = FetchType.EAGER) // change to lazy for performance later; eager for testing
    @JoinTable(
            name = "question_bank_category_children",
            joinColumns = @JoinColumn(name = "parent_id"),
            inverseJoinColumns = @JoinColumn(name = "child_id")
    )
    private List<QuestionBankCategory> categories;
}
