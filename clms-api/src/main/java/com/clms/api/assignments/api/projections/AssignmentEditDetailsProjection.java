package com.clms.api.assignments.api.projections;

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
    private List<AssignmentQuestionProjection> questions;
}
