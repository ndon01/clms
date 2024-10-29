package com.clms.api.assignments;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.AttributeConverter;

import java.io.IOException;
import java.util.List;

public class AssignmentQuestionAnswerConverter implements AttributeConverter<List<AssignmentQuestionAnswer>, String> {

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
