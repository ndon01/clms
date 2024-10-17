package com.clms.api.assignments.attempts;

import com.clms.api.assignments.Assignment;
import com.clms.api.assignments.AssignmentRepository;
import com.clms.api.common.security.requiresUser.RequiresUser;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/assignments/attempts")
@RequiredArgsConstructor
@Slf4j
@RequiresUser
public class AssignmentAttemptController {

    private final AssignmentRepository assignmentRepository;

    @PostMapping("/start-attempt")
    public ResponseEntity<?> startAttempt(@RequestBody StartAssignmentAttemptRequest startAssignmentRequest) {
        if (startAssignmentRequest.getAssignmentId() == null) {
            return ResponseEntity.badRequest().build();
        }

        Assignment assignment = assignmentRepository.findById(startAssignmentRequest.getAssignmentId()).orElse(null);
        if (assignment == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.status(201).build();
    }
}

@Data
class StartAssignmentAttemptRequest {
    private Integer assignmentId;
}