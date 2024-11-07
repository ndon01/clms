package com.clms.api.courses.gradebook;

import com.clms.api.common.security.currentUser.CurrentUser;
import com.clms.api.courses.gradebook.DTO.StudentGradebookProjection;
import com.clms.api.courses.gradebook.DTO.TutorGradebookProjection;
import com.clms.api.courses.gradebook.DTO.TutorGradebookRequestDTO;
import com.clms.api.courses.gradebook.services.StudentGradebookService;
import com.clms.api.courses.gradebook.services.TutorGradebookService;
import com.clms.api.users.api.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/courses/gradebook")
public class GradebookController {

    private final TutorGradebookService tutorGradebookService;

    private final StudentGradebookService studentGradebookService;

    @GetMapping("/getTutorView")
    public ResponseEntity<TutorGradebookProjection> getGradebookAsTutor(@RequestParam Integer courseId) {
        return ResponseEntity.ok(tutorGradebookService.getGradebookAsTutor(courseId));
    }
    @GetMapping("/getStudentView")
    public ResponseEntity<StudentGradebookProjection> getGradebookAsStudent(@RequestParam Integer courseId, @CurrentUser User user){
        return ResponseEntity.ok(studentGradebookService.getGradeBookAsStudent(courseId,user));
    }
}

