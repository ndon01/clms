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
    private Integer id;
    private String categoryName;
    private Integer parentId;
}
