package com.clms.api.courses.gradebook;

import com.clms.api.courses.gradebook.DTO.TutorGradebookProjection;
import com.clms.api.courses.gradebook.DTO.TutorGradebookRequestDTO;
import com.clms.api.courses.gradebook.services.TutorGradebookService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/courses/gradebook")
public class GradebookController {

    private final TutorGradebookService tutorGradebookService;


    @GetMapping("/getTutorView")
    public ResponseEntity<TutorGradebookProjection> getGradebookAsTutor(@RequestParam Integer courseId) {
        return ResponseEntity.ok(tutorGradebookService.getGradebookAsTutor(courseId));
    }
}

