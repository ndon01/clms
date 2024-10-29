package com.clms.api.assignments;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.UUID;

@Getter
@Setter
public class AssignmentQuestionAnswer implements Serializable {

    private UUID id = UUID.randomUUID();

    private int order = 0;

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
