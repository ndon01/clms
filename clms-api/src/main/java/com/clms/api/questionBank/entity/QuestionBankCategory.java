package com.clms.api.questionBank.entity;

import jakarta.persistence.*;
import lombok.*;

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
}
