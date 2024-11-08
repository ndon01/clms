package com.clms.api.questionBank.models;

import com.clms.api.assignments.AssignmentQuestion;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "question_bank_questions")
@Data
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class QuestionBankQuestion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "question_name")
    private String questionName;


    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "source_question_id", referencedColumnName = "id")
    private AssignmentQuestion sourceQuestion;

    @Column
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "question_bank_question_category_mapping",
            joinColumns = @JoinColumn(name = "question_bank_question_id"),
            inverseJoinColumns = @JoinColumn(name = "question_bank_category_id")
    )
    private List<QuestionBankCategory> categories;
}
