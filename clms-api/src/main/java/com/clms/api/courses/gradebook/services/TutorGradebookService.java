package com.clms.api.courses.gradebook.services;

import com.clms.api.assignments.api.entity.Assignment;
import com.clms.api.assignments.api.projections.AssignmentDetailsProjection;
import com.clms.api.assignments.api.projections.converters.AssignmentAttemptProjectionConverter;
import com.clms.api.assignments.attempts.AssignmentAttemptRepository;
import com.clms.api.assignments.attempts.models.AssignmentAttempt;
import com.clms.api.courses.CourseRepository;
import com.clms.api.courses.api.Course;
import com.clms.api.courses.gradebook.DTO.TutorGradebookProjection;
import lombok.RequiredArgsConstructor;
import org.springdoc.api.OpenApiResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TutorGradebookService {
    private final CourseRepository courseRepository;
    private final AssignmentAttemptRepository attemptRepository;
    private final AssignmentAttemptProjectionConverter attemptProjectionConverter;
    public TutorGradebookProjection getGradebookAsTutor(Integer courseId){
        Course currentCourse = courseRepository.findById(courseId).orElse(null);

        if (currentCourse == null) {
            throw new OpenApiResourceNotFoundException("No course found with id " + courseId);

        }
        //Get all assignments for a course
        List<Assignment> assignments = currentCourse.getAssignments();
        List<AssignmentDetailsProjection> assignmentDetailsResponses = assignments
                .stream()
                .map(assignment -> AssignmentDetailsProjection
                        .builder()
                        .id(assignment.getId())
                        .name(assignment.getName())
                        .description(assignment.getDescription())
                        .startDate(assignment.getStartDate())
                        .dueDate(assignment.getDueDate())
                        .build())
                .collect(Collectors.toList());

        List<AssignmentAttempt> assignmentAttempts = assignments.stream().map(
                        attemptRepository::findAllByAssignment
        )
                .flatMap(List::stream)
                .toList();
        //Fetch all attempts for a
        return TutorGradebookProjection.builder()
                .allAssignments(assignmentDetailsResponses)
                .allAttempts(assignmentAttempts.stream().map(attemptProjectionConverter::convert).toList())
                .build();
    }
}
