package com.clms.api.courses;

import com.clms.api.assignments.Assignment;
import com.clms.api.assignments.AssignmentRepository;
import com.clms.api.common.domain.Course;
import com.clms.api.common.domain.User;
import com.clms.api.common.security.currentUser.CurrentUser;
import com.clms.api.common.security.requiresUser.RequiresUser;
import com.clms.api.courses.assignments.CourseAssignment;
import com.clms.api.courses.assignments.CourseAssignmentId;
import com.clms.api.courses.assignments.CourseAssignmentRepository;
import com.clms.api.courses.members.CourseMemberInsertService;
import com.clms.api.courses.members.CourseMemberRemoveService;
import com.clms.api.courses.members.CourseMemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
@RequiredArgsConstructor
public class CourseController {
    private final CourseRepository courseRepository;
    private final CourseMemberInsertService courseMemberInsertService;
    private final CourseMemberRemoveService courseMemberRemoveService;
    private final CourseMemberRepository courseMemberRepository;
    private final AssignmentRepository assignmentRepository;
    private final CourseAssignmentRepository courseAssignmentRepository;

    @GetMapping()
    public List<Course> getCourses() {
        return courseRepository.findAll();
    }


    @GetMapping("/getMyCourses")
    @RequiresUser
    public List<Course> getMyCourses(@CurrentUser User user) {
        List<Integer> courseIds = courseMemberRepository.getCourseIdsByUserId(user.getId());
        return courseRepository.findAllById(courseIds);
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

    @GetMapping("/{courseId}/assignments")
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

        assignment = assignmentRepository.saveAndFlush(assignment);

        CourseAssignment courseAssignment = new CourseAssignment();

        CourseAssignmentId courseAssignmentId = new CourseAssignmentId();
        courseAssignmentId.setAssignment(assignment);
        courseAssignmentId.setCourse(currentCourse);

        courseAssignment.setId(courseAssignmentId);

        courseAssignmentRepository.saveAndFlush(courseAssignment);

        return ResponseEntity.ok().build();
    }
}

