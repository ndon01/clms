package com.clms.api.courses.modules.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CourseModuleAddAssignmentsDto {
    private Integer moduleId;
    private List<Integer> assignmentIds;
}
