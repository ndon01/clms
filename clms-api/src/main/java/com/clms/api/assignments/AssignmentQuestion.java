package com.clms.api.assignments;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.io.IOException;
import java.util.UUID;

@Entity()
@Data
@Table(name = "questions")
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


