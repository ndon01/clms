package com.clms.api.courses;

import com.clms.api.authorization.Permission;
import com.clms.api.authorization.PermissionCreationDto;
import jakarta.transaction.Transactional;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/courses")
@RequiredArgsConstructor
public class CourseController
{
    private final CourseRepository courseRepository;


    @GetMapping()
    public List<Course> getCourses()
    {
        return courseRepository.findAll();
    }

    @PutMapping()
    public ResponseEntity<?> createCouse(@RequestBody CourseCreationDto courseDto)
    {
        Course newCourse = new Course();
        newCourse.setCourseName(courseDto.getCourseName());
        newCourse.setDescription(courseDto.getDescription());

        courseRepository.saveAndFlush(newCourse);
        return ResponseEntity.status(201).build();
    }

    @PostMapping("/courses/{courseId}")
    public ResponseEntity<?> updateCourse(@PathVariable int courseId, @RequestParam(value = "courseName", required = false) String updatedCourseName)
    {
        Course currentCourse = courseRepository.findById(courseId).orElse(null);
        if (currentCourse == null) {
            return ResponseEntity.status(400).build();
        }

        if (updatedCourseName != null) {
            currentCourse.setCourseName(updatedCourseName);
        }

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/courses/{courseId}")
    @Transactional
    public ResponseEntity<?> deleteCourse(@PathVariable int courseId)
    {
        Course currentCourse = courseRepository.findById(courseId).orElse(null);
        if (currentCourse == null) {
            return ResponseEntity.status(400).build();
        }
        courseRepository.delete(currentCourse);
        return ResponseEntity.ok().build();
    }


}

