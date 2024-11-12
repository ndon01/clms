package com.clms.api.questions.api.entity;

import com.clms.api.users.api.User;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Entity
@Table(name = "question_generation_orders")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuestionGenerationOrderEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @JoinColumn(name = "ordered_by")
    @OneToOne
    private User orderedBy;

    @Column(name = "order_state")
    @Enumerated(EnumType.STRING)
    private QuestionGenerationOrderState orderState;

    @Column(name = "order_type", columnDefinition = "jsonb")
    @Enumerated(EnumType.STRING)
    private QuestionGenerationOrderType orderType;

    @Column(name = "order_details", columnDefinition = "TEXT", length = 1000)
    @Convert(converter = MapToJsonConverter.class)
    private Map<String, Object> orderDetails;


    @Column(name = "order_output", columnDefinition = "TEXT", length = 1000)
    @Convert(converter = MapToJsonConverter.class)
    private Map<String, Object> orderOutput;
}

@Converter(autoApply = true)
class MapToJsonConverter implements AttributeConverter<Map<String, Object>, String> {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(Map<String, Object> attribute) {
        try {
            return objectMapper.writeValueAsString(attribute);
        } catch (JsonProcessingException e) {
            throw new IllegalArgumentException("Error converting map to JSON string", e);
        }
    }

    @Override
    public Map<String, Object> convertToEntityAttribute(String dbData) {
        try {
            return objectMapper.readValue(dbData, HashMap.class);
        } catch (Exception e) {
            throw new IllegalArgumentException("Error converting JSON string to map", e);
        }
    }
}
