package com.clms.api.assignments.api.projections.converters;

import com.clms.api.assignments.Assignment;
import com.clms.api.assignments.api.projections.AssignmentEditDetailsProjection;
import com.clms.api.courses.api.Course;
import com.clms.api.common.web.projections.GenericProjectionConverter;
import com.clms.api.courses.api.projections.CourseDetailsProjection;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AssignmentEditDetailsProjectionConverter implements GenericProjectionConverter<Assignment, AssignmentEditDetailsProjection> {

    private final GenericProjectionConverter<Course, CourseDetailsProjection> courseDetailsProjectionConverter;

    @Override
    public AssignmentEditDetailsProjection convert(Assignment assignment) {
        return AssignmentEditDetailsProjection.builder()
                .id(assignment.getId())
                .name(assignment.getName())
                .description(assignment.getDescription())
                .dueDate(assignment.getDueDate())
                .startDate(assignment.getStartDate())
                .questions(assignment.getQuestions())
                .timeLimitMinutes(assignment.getTimeLimitMinutes())
                .maxAttempts(assignment.getMaxAttempts())
                .course(courseDetailsProjectionConverter.convert(assignment.getCourse()))
                .build();
    }
}
