package com.clms.api.adaptiveLearning;

import com.clms.api.assignments.Assignment;
import com.clms.api.assignments.AssignmentQuestionRepository;
import com.clms.api.assignments.api.projections.AssignmentQuestionProjection;
import com.clms.api.assignments.attempts.AssignmentAttemptRepository;
import com.clms.api.assignments.attempts.models.AssignmentAttempt;
import com.clms.api.questionBank.repositories.QuestionBankQuestionRepository;
import com.clms.api.questions.api.dto.GeneratedQuestionDTO;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/adaptive-learning")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "AdaptiveLearning", description = "Endpoints for adaptive learning")
public class AdaptiveLearningController {

    private final AssignmentQuestionRepository assignmentQuestionRepository;
    private final AssignmentAttemptRepository assignmentAttemptRepository;
    private final QuestionBankQuestionRepository questionBankQuestionRepository;
    @GetMapping("/getReccomendations")
    public ResponseEntity<List<AssignmentQuestionProjection>> getReccomendations(@RequestBody String userId) {
            return null;
    }

}
