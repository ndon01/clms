package com.clms.api.questionBank.questions;

import com.clms.api.assignments.AssignmentQuestion;
import com.clms.api.assignments.AssignmentQuestionRepository;
import com.clms.api.common.web.util.PaginationRequest;
import com.clms.api.questionBank.api.projections.QuestionBankQuestionProjection;
import com.clms.api.questionBank.api.projections.converters.QuestionBankQuestionProejctionConverter;
import com.clms.api.questionBank.entity.QuestionBankQuestion;
import com.clms.api.questionBank.repositories.QuestionBankQuestionRepository;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/question-bank/questions")
@RequiredArgsConstructor
@Tag(name = "Question Bank", description = "Endpoints for managing questions and categories")
public class QuestionBankQuestionController {

    private final QuestionBankQuestionRepository questionBankQuestionRepository;
    private final QuestionBankQuestionProejctionConverter questionBankQuestionProejctionConverter;
    private final AssignmentQuestionRepository assignmentQuestionRepository;

    @GetMapping("/pageable")
    public List<QuestionBankQuestionProjection> getQuestions(PaginationRequest paginationRequest) {
        return questionBankQuestionRepository
                .findAll(paginationRequest.toPageRequest()).stream()
                .map(questionBankQuestionProejctionConverter::convert)
                .toList();
    }
    @PostMapping(value = "/create", produces = "application/text")
    public ResponseEntity<String> createQuestion(@RequestBody QuestionBankQuestion question) {
        if (question == null) {
            return ResponseEntity.badRequest().body("Question cannot be null");
        }
        AssignmentQuestion assignmentQuestion = assignmentQuestionRepository.findById(question.getId()).orElse(null);
        if (assignmentQuestion == null) {
            return ResponseEntity.badRequest().body("Question not found");
        }
        if (assignmentQuestion.getSourceQuestionBankQuestion() != null){
            return ResponseEntity.badRequest().body("Question already exists in the question bank.");
        }
        QuestionBankQuestion questionBankQuestion = new QuestionBankQuestion();
        questionBankQuestion.setQuestionName(assignmentQuestion.getTitle());
        questionBankQuestion.setSourceQuestion(assignmentQuestion);
        questionBankQuestionRepository.save(questionBankQuestion);

        assignmentQuestion.setSourceQuestionBankQuestion(questionBankQuestion);
        assignmentQuestionRepository.save(assignmentQuestion);
        return ResponseEntity.ok("Question added to the question bank.");
    }
}
