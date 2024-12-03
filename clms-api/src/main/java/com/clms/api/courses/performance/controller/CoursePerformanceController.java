package com.clms.api.courses.performance.controller;

import com.clms.api.assignments.AssignmentRepository;
import com.clms.api.common.security.currentUser.CurrentUser;
import com.clms.api.courses.CourseRepository;
import com.clms.api.courses.api.Course;
import com.clms.api.courses.members.CourseMember;
import com.clms.api.courses.members.CourseMemberRepository;
import com.clms.api.courses.performance.dto.CourseCategoryPerformanceDto;
import com.clms.api.courses.performance.service.CourseCategoryPerformanceCalculationService;
import com.clms.api.users.api.User;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/courses/performance")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Course", description = "Endpoints for managing courses")
public class CoursePerformanceController {
    private final CourseRepository courseRepository;
    private final AssignmentRepository assignmentRepository;
    private final CourseCategoryPerformanceCalculationService courseCategoryPerformanceCalculationService;
    private final CourseMemberRepository courseMemberRepository;

    @GetMapping("/get-course-category-performance")
    public ResponseEntity<CourseCategoryPerformanceDto> getCourseCategoryPerformance(@CurrentUser User user, @RequestParam int courseId) {
        Course course = courseRepository.findById(courseId).orElse(null);
        if (course == null) {
            return ResponseEntity.notFound().build();
        }

        CourseMember courseMember = courseMemberRepository.findCourseMemberByCourseAndUser(course, user).orElse(null);
        if (courseMember == null) {
            return ResponseEntity.notFound().build();
        }

        CourseCategoryPerformanceDto courseCategoryPerformanceDto = courseCategoryPerformanceCalculationService.calculate(courseMember);

        return ResponseEntity.ok(courseCategoryPerformanceDto);
    }
}

