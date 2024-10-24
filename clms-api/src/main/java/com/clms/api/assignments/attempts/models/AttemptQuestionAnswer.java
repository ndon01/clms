package com.clms.api.assignments.attempts.models;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class AttemptQuestionAnswer implements Serializable {

    private int questionId;

    private String selectedAnswerId;

}
