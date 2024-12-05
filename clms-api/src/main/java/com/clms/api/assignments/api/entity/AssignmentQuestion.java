package com.clms.api.assignments.api.entity;

import com.clms.api.assignments.AssignmentQuestionAnswerConverter;
import com.clms.api.questionBank.api.entity.QuestionBankQuestion;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

@Entity()
@Table(name = "questions")
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AssignmentQuestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String title;

    @Column(columnDefinition = "TEXT", length = 1024)
    private String question;

    @Column(name = "created_at")
    private Date createdAt;

    @Column(name = "updated_at")
    private Date updatedAt;

    @Column(name = "question_type")
    private String questionType = "Single Choice";

    @Column(name = "keep_answers_ordered")
    private Boolean keepAnswersOrdered = false;

    @Column(name = "assignment_order")
    private int order = 0;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "source_question_bank_question_id")
    private QuestionBankQuestion sourceQuestionBankQuestion;

    @Column(name = "source_question_bank_question_id", insertable = false, updatable = false)
    private Integer sourceQuestionBankQuestionId;

    /*
    export type Answer = {
      text: string;
      isCorrect: boolean;
    }
     */
    @Column(columnDefinition = "TEXT", length = 1024)
    @Convert(converter = AssignmentQuestionAnswerConverter.class)
    private List<AssignmentQuestionAnswer> answers;

    @ManyToOne(fetch= FetchType.LAZY)
    @JoinColumn(name = "assignment_id",foreignKey = @ForeignKey(name = "fk_assignment_id"))
    @JsonIgnore
    private Assignment assignment;
}


