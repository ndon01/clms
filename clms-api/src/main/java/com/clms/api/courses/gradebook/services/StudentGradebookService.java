package com.clms.api.courses.gradebook.services;

import com.clms.api.assignments.Assignment;
import com.clms.api.assignments.api.projections.AssignmentDetailsProjection;
import com.clms.api.assignments.attempts.AssignmentAttemptRepository;
import com.clms.api.assignments.attempts.models.AssignmentAttempt;
import com.clms.api.courses.CourseRepository;
import com.clms.api.courses.api.Course;
import com.clms.api.courses.gradebook.DTO.StudentAssignmentAttemptProjection;
import com.clms.api.courses.gradebook.DTO.StudentGradebookProjection;
import com.clms.api.users.api.User;
import lombok.RequiredArgsConstructor;
import org.springdoc.api.OpenApiResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class StudentGradebookService {
    private final CourseRepository courseRepository;
    private final AssignmentAttemptRepository assignmentAttemptRepository;

    public StudentGradebookProjection getGradeBookAsStudent(Integer courseId, User user) {
        Course currentCourse = courseRepository.findById(courseId).orElseThrow(() ->
                new OpenApiResourceNotFoundException("No course found with id " + courseId));
        //Get all assignments for a course
        List<AssignmentDetailsProjection> assignments = currentCourse.getAssignments()
                .stream()
                .map(assignment-> AssignmentDetailsProjection.builder()
                        .id(assignment.getId())
                        .name(assignment.getName())
                        .dueDate(assignment.getDueDate())
                        .build())
                .toList();

        //All attempts for a student
        List<StudentAssignmentAttemptProjection> attempts = new ArrayList<>();

        for (Assignment assignment : currentCourse.getAssignments()) {
            List<AssignmentAttempt> attemptsForAssignment = assignmentAttemptRepository.findAssignmentAttemptsByUserAndAssignment(user, assignment);

            AssignmentAttempt attempt = attemptsForAssignment.stream()
                    .filter(a -> a.getScorePercentage() != null)  // Filter out null scorePercentage
                    .max(Comparator.comparingDouble(AssignmentAttempt::getScorePercentage))
                    .orElse(null);
            if (attempt != null) {
                attempts.add(StudentAssignmentAttemptProjection.builder()
                        .id(attempt.getId().toString())
                        .assignment(AssignmentDetailsProjection.builder()
                                .id(assignment.getId())
                                .name(assignment.getName())
                                .dueDate(assignment.getDueDate())
                                .build())
                        .status(attempt.getStatus())
                        .scorePercentage(attempt.getScorePercentage())
                        .build());
            }
        }

        return StudentGradebookProjection.builder()
                .assignments(assignments)
                .attempts(attempts)
                .build();
    }
}
