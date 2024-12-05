package com.clms.api.assignments.api.projections.converters;

import com.clms.api.assignments.api.entity.Assignment;
import com.clms.api.assignments.api.projections.AssignmentEditDetailsProjection;
import com.clms.api.courses.api.Course;
import com.clms.api.common.interfaces.GenericConverter;
import com.clms.api.courses.api.projections.CourseDetailsProjection;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AssignmentEditDetailsProjectionConverter implements GenericConverter<Assignment, AssignmentEditDetailsProjection> {

    private final GenericConverter<Course, CourseDetailsProjection> courseDetailsProjectionConverter;
    private final AssignmentQuestionProjectionConverter assignmentQuestionProjectionConverter;

    @Override
    public AssignmentEditDetailsProjection convert(Assignment assignment) {
        return AssignmentEditDetailsProjection.builder()
                .id(assignment.getId())
                .name(assignment.getName())
                .description(assignment.getDescription())
                .dueDate(assignment.getDueDate())
                .startDate(assignment.getStartDate())
                .questions(assignment.getQuestions().stream().map(assignmentQuestionProjectionConverter::convert).collect(Collectors.toList()))
                .timeLimitMinutes(assignment.getTimeLimitMinutes())
                .maxAttempts(assignment.getMaxAttempts())
                .course(courseDetailsProjectionConverter.convert(assignment.getCourse()))
                .build();
    }
}
