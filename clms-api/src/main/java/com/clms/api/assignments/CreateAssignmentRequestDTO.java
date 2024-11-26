package com.clms.api.assignments;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CreateAssignmentRequestDTO{
    private Assignment assignmentInfo;
    private List<Integer> questionIds;
    private Integer courseId;
}

