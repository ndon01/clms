package com.clms.api.assignments.projections;

import com.clms.api.assignments.AssignmentQuestion;
import com.clms.api.courses.api.projections.CourseDetailsProjection;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@Builder
public class AssignmentEditDetailsProjection {
    private Integer id;
    private String name;
    private String description;
    private Date dueDate;
    private Date startDate;
    private CourseDetailsProjection course;
    private Integer maxAttempts;
    private Integer timeLimitMinutes;
    private List<AssignmentQuestion> questions;
}
