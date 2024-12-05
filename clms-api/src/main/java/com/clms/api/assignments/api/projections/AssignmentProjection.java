package com.clms.api.assignments.api.projections;

import com.clms.api.courses.api.projections.CourseProjection;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@Builder
public class AssignmentProjection {
    private Integer id;
    private String name;
    private String description;
    private List<AssignmentQuestionProjection> questions;
    private CourseProjection course;
    private Integer maxAttempts;
    private Integer timeLimitMinutes;
    private Date startDate;
    private Date dueDate;
    private Date createdAt;
    private Date updatedAt;
}
