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


class AssignmentQuestionAnswerConverter implements AttributeConverter<List<AssignmentQuestionAnswer>, String> {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(List<AssignmentQuestionAnswer> answers) {
        try {
            // Convert the List of answers to a JSON String
            return objectMapper.writeValueAsString(answers);
        } catch (JsonProcessingException e) {
            // Handle exception in case of failure
            throw new RuntimeException("Could not serialize answers list", e);
        }
    }

    @Override
    public List<AssignmentQuestionAnswer> convertToEntityAttribute(String answersJSON) {
        try {
            // Convert the JSON String back to a List of answers
            return objectMapper.readValue(answersJSON,
                    objectMapper.getTypeFactory().constructCollectionType(List.class, AssignmentQuestionAnswer.class));
        } catch (IOException e) {
            // Handle exception in case of failure
            throw new RuntimeException("Could not deserialize answers list", e);
        }
    }
}
@Data
class AssignmentQuestionAnswer implements Serializable {
    private String text;

    @JsonProperty("isCorrect") // Explicitly map the JSON property to this field
    private boolean isCorrect;

    public boolean isCorrect() {
        return isCorrect;
    }

    public void setCorrect(boolean correct) {
        isCorrect = correct;
    }
}
@Data
class AssignmentQuestionRequest {
    private String question;
    private String title;
    private String questionType;
    private List<AssignmentQuestionAnswer> answers;
    private Date createdAt = new Date();
    private Date updatedAt = new Date();

    private int assignmentId;
}
