package com.clms.api.courses;

import com.clms.api.assignments.Assignment;
import com.clms.api.assignments.projections.AssignmentDetailsProjection;
import com.clms.api.assignments.AssignmentRepository;
import com.clms.api.courses.api.Course;
import com.clms.api.users.api.User;
import com.clms.api.common.security.currentUser.CurrentUser;
import com.clms.api.common.security.requiresUser.RequiresUser;
import com.clms.api.common.web.projections.GenericProjectionConverter;
import com.clms.api.courses.members.CourseMemberInsertService;
import com.clms.api.courses.members.CourseMemberRemoveService;
import com.clms.api.courses.members.CourseMemberRepository;
import com.clms.api.courses.api.projections.CourseDetailsProjection;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/courses")
@RequiredArgsConstructor
public class CourseController {
    private final CourseRepository courseRepository;
    private final CourseMemberInsertService courseMemberInsertService;
    private final CourseMemberRemoveService courseMemberRemoveService;
    private final CourseMemberRepository courseMemberRepository;
    private final AssignmentRepository assignmentRepository;
    private final GenericProjectionConverter<Course, CourseDetailsProjection> courseDetailsProjectionConverter;

    @GetMapping()
    public List<CourseDetailsProjection> getCourses() {
        return courseRepository.findAll().stream().map(courseDetailsProjectionConverter::convert).collect(Collectors.toList());
    }

    @GetMapping("/getMyCourses")
    @RequiresUser
    public List<CourseDetailsProjection> getMyCourses(@CurrentUser User user) {
        List<Integer> courseIds = courseMemberRepository.getCourseIdsByUserId(user.getId());
        return courseRepository.findAllById(courseIds).stream().map(courseDetailsProjectionConverter::convert).collect(Collectors.toList());
    }

    @Transactional
    @GetMapping("/getCourseFromAssignment")
    public Course getCourseFromAssignment(@RequestParam int assignmentId) {
        Assignment assignment = assignmentRepository.findById(assignmentId).orElse(null);
        if (assignment == null) {
            return null;
        }
        return assignment.getCourse();
    }

    @PostMapping()
    public ResponseEntity<?> createCourse(@RequestBody CourseCreationDto courseDto) {
        Course newCourse = new Course();
        newCourse.setName(courseDto.getCourseName());
        newCourse.setDescription(courseDto.getDescription());

        // ...

        courseRepository.save(newCourse);


        //*
        return ResponseEntity.status(201).build();
    }

    @PutMapping("/{courseId}")
    public ResponseEntity<?> updateCourse(@PathVariable int courseId, @RequestParam(value = "name", required = false) String updatedCourseName) {
        Course currentCourse = courseRepository.findById(courseId).orElse(null);
        if (currentCourse == null) {
            return ResponseEntity.status(400).build();
        }

        if (updatedCourseName != null) {
            currentCourse.setName(updatedCourseName);
        }

        courseRepository.save(currentCourse);

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{courseId}")
    @Transactional
    public ResponseEntity<?> deleteCourse(@PathVariable int courseId) {
        Course currentCourse = courseRepository.findById(courseId).orElse(null);
        if (currentCourse == null) {
            return ResponseEntity.status(400).build();
        }
        courseRepository.delete(currentCourse);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{courseId}/members")
    public ResponseEntity<?> addMembers(@PathVariable int courseId, @RequestBody List<Integer> memberIds) {
        Course currentCourse = courseRepository.findById(courseId).orElse(null);
        if (currentCourse == null) {
            return ResponseEntity.status(400).build();
        }

        courseMemberInsertService.insertMembersByUserIdsAndCourseId(memberIds, courseId);

        // ...
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{courseId}/members/removeBulkMembers")
    public ResponseEntity<?> removeMembers(@PathVariable int courseId, @RequestBody List<Integer> memberIds) {
        Course currentCourse = courseRepository.findById(courseId).orElse(null);
        if (currentCourse == null) {
            return ResponseEntity.status(400).build();
        }

        for (Integer memberId : memberIds) {
            courseMemberRemoveService.removeMemberByUserIdAndCourseId(memberId, courseId);
        }

        // ...
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{courseId}/members")
    public ResponseEntity<List<User>> getCourseMembers(@PathVariable int courseId)
    {
        Course currentCourse = courseRepository.findById(courseId).orElse(null);
        if (currentCourse == null) {
            return ResponseEntity.status(400).build();
        }

        List<User> members = currentCourse.getMembers();


        return ResponseEntity.ok(members);
    }



    @GetMapping("/getAllAssignmentsDetails")
    public ResponseEntity<List<AssignmentDetailsProjection>> getCourseAssignments2(@RequestParam Integer courseId) {
        Course currentCourse = courseRepository.findById(courseId).orElse(null);
        if (currentCourse == null) {
            return ResponseEntity.status(400).build();
        }

        List<AssignmentDetailsProjection> assignmentDetailsResponses = currentCourse.getAssignments()
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

        return ResponseEntity.ok(assignmentDetailsResponses);
    }

    @GetMapping("/{courseId}/assignments")
    @Transactional
    public ResponseEntity<List<Assignment>> getCourseAssignments(@PathVariable int courseId) {
        Course currentCourse = courseRepository.findById(courseId).orElse(null);
        if (currentCourse == null) {
            return ResponseEntity.status(400).build();
        }

        List<Assignment> assignments = currentCourse.getAssignments();

        return ResponseEntity.ok(assignments);
    }

    @PostMapping("/{courseId}/assignments/create")
    public ResponseEntity<?> createAssignment(@PathVariable int courseId, @RequestBody Assignment assignment) {
        Course currentCourse = courseRepository.findById(courseId).orElse(null);
        if (currentCourse == null) {
            return ResponseEntity.status(400).build();
        }

        if (assignment == null) {
            return ResponseEntity.status(400).build();
        }

        assignment.setCourse(currentCourse);

        assignmentRepository.saveAndFlush(assignment);
        return ResponseEntity.ok().build();
    }
}

