package com.clms.api.assignments.attempts;

import com.clms.api.assignments.Assignment;
import com.clms.api.assignments.AssignmentRepository;
import com.clms.api.common.domain.User;
import com.clms.api.common.security.currentUser.CurrentUser;
import com.clms.api.common.security.requiresUser.RequiresUser;
import com.clms.api.courses.assignments.CourseAssignment;
import com.clms.api.courses.assignments.CourseAssignmentId;
import com.clms.api.courses.assignments.CourseAssignmentRepository;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/assignments/attempts")
@RequiredArgsConstructor
@Slf4j
@RequiresUser
public class AssignmentAttemptController {

    private final AssignmentRepository assignmentRepository;
    private final CourseAssignmentRepository courseAssignmentRepository;
    private final AssignmentAttemptRepository assignmentAttemptRepository;

    @PostMapping("/start-attempt")
    public ResponseEntity<?> startAttempt(@CurrentUser User user, @RequestBody StartAssignmentAttemptRequest startAssignmentRequest) {
        int userId = user.getId();
        Assignment assignment = assignmentRepository.findById(startAssignmentRequest.getAssignmentId()).orElse(null);
        CourseAssignment courseAssignment = courseAssignmentRepository.findById(new CourseAssignmentId(assignment)).orElse(null);



        if(assignment == null) {
            return ResponseEntity.notFound().build();
        }

        if(courseAssignment == null) {
            return ResponseEntity.notFound().build();
            //TODO FIX THIS ONCE WE CAN MAKE AN ASSIGNMENT OUTSIDE OF A COURSE
        }



        return ResponseEntity.status(201).build();


    }

    /*@PostMapping("/submit-attempt")
    public ResponseEntity<?> submitCurrentAttempt(@CurrentUser User user, @PathVariable int assignmentId, @RequestBody SubmitAssignmentAttemptRequest submitAssignmentRequest)
    {
        //do all the checks
        // change status to finished
        //send to ReportController?
        // return 201

    }*/ //need to be able to mark assignment as done. feels weird just putting it back into the repository
}

@Data
class StartAssignmentAttemptRequest {
    private Integer assignmentId;
}

class SubmitAssignmentAttemptRequest {
    private Integer assignmentId;
}