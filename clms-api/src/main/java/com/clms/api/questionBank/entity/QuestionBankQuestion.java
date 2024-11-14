package com.clms.api.questionBank.entity;

import com.clms.api.assignments.AssignmentQuestion;
import jakarta.persistence.*;
import lombok.*;

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
    private Integer id;

    @Column(name = "question_name")
    private String questionName;


    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "source_question_id", referencedColumnName = "id")
    private AssignmentQuestion sourceQuestion;
}
