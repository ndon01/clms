package com.clms.api.assignments.attempts.models;

import com.clms.api.assignments.api.entity.Assignment;
import com.clms.api.users.api.User;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.io.IOException;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "assignment_attempts")
@Getter
@Setter
public class AssignmentAttempt {

    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assignment_id", nullable = false)
    private Assignment assignment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column
    @Enumerated(EnumType.STRING)
    private AssignmentAttemptStatus status;

    private Instant startedAt;

    @Column(name = "question_answers",columnDefinition = "TEXT", length = 1024)
    @Convert(converter = AttemptQuestionAnswersConverter.class)
    private List<AttemptQuestionAnswer> answers;

    @Column(name ="score_percentage")
    private Double scorePercentage;

    @Column(name = "answers_correct")
    private Integer answersCorrect;

    @Column(name = "submitted_at")
    private Instant submittedAt;

}

class AttemptQuestionAnswersConverter implements AttributeConverter<List<AttemptQuestionAnswer>, String> {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(List<AttemptQuestionAnswer> answers) {
        if(answers == null){
            return null;
        }
        try {
            // Convert the List of answers to a JSON String
            return objectMapper.writeValueAsString(answers);
        } catch (JsonProcessingException e) {
            // Handle exception in case of failure
            throw new RuntimeException("Could not serialize answers list", e);
        }
    }

    @Override
    public List<AttemptQuestionAnswer> convertToEntityAttribute(String answersJSON) {
        if (answersJSON == null) {
            return null;
        }
        try {
            // Convert the JSON String back to a List of answers
            return objectMapper.readValue(answersJSON,
                    objectMapper.getTypeFactory().constructCollectionType(List.class, AttemptQuestionAnswer.class));
        } catch (IOException e) {
            // Handle exception in case of failure
            throw new RuntimeException("Could not deserialize answers list", e);
        }
    }
}
