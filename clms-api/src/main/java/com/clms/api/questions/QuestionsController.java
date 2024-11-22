package com.clms.api.questions;

import com.clms.api.assignments.AssignmentQuestion;
import com.clms.api.assignments.AssignmentQuestionRepository;
import com.clms.api.assignments.api.projections.AssignmentQuestionProjection;
import com.clms.api.assignments.api.projections.converters.AssignmentQuestionProjectionConverter;
import com.clms.api.common.security.currentUser.CurrentUser;
import com.clms.api.questionBank.entity.QuestionBankQuestion;
import com.clms.api.questionBank.repositories.QuestionBankQuestionRepository;
import com.clms.api.questions.api.entity.QuestionGenerationOrderEntity;
import com.clms.api.questions.api.entity.QuestionGenerationOrderRepository;
import com.clms.api.questions.api.entity.QuestionGenerationOrderState;
import com.clms.api.questions.api.events.QuestionGenerationOrderEvent;
import com.clms.api.questions.dto.QuestionsFromYoutubeVideoRequest;
import com.clms.api.users.api.User;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.Response;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/questions")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Questions", description = "Endpoints for generating questions")
public class QuestionsController {

    private final QuestionGenerationService questionGenerationService;
    private final QuestionGenerationOrderEventHandler questionGenerationOrderEventHandler;
    private final QuestionGenerationConfiguration questionGenerationConfiguration;
    private final AssignmentQuestionRepository assignmentQuestionRepository;
    private final QuestionBankQuestionRepository questionBankQuestionRepository;
    private final QuestionGenerationOrderRepository questionGenerationOrderRepository;
    private final AssignmentQuestionProjectionConverter assignmentQuestionProjectionConverter;

    @PostMapping("/generate-from-youtube-video")
    public ResponseEntity<String> generateQuestions(@RequestBody QuestionsFromYoutubeVideoRequest request) {
        if (!questionGenerationConfiguration.isEnabled()) {
            return ResponseEntity.badRequest().body("Question generation is disabled.");
        }

        String videoUrl = request.getVideoUrl();

        try {
            questionGenerationService.generateFromYoutubeVideo(videoUrl);
        } catch (
                IllegalStateException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        return ResponseEntity.ok("Questions are being generated from the video. This may take a while.");
    }

    @GetMapping("/getCompletedOrders")
    public ResponseEntity<List<QuestionGenerationOrderEntity>> getCompletedOrders(@CurrentUser User user) {
        List<QuestionGenerationOrderEntity> completedOrders = questionGenerationOrderRepository.findAllByOrderedBy(user)
                .stream()
                .filter(order -> order.getOrderState() == QuestionGenerationOrderState.COMPLETED)
                .collect(Collectors.toList());
        return ResponseEntity.ok(completedOrders);
    }

    @GetMapping("getCompletedOrders/{id}")
    public ResponseEntity<QuestionGenerationOrderEntity> getCompletedOrder(@PathVariable int id) {
        QuestionGenerationOrderEntity order = questionGenerationOrderRepository.findById(id).orElseThrow();
        return ResponseEntity.ok(order);
    }



    @Transactional(rollbackOn = Exception.class)
    @Async
    @EventListener
    public void onQuestionGenerationOrderEvent(QuestionGenerationOrderEvent event) {
        questionGenerationOrderEventHandler.handle(event);
    }

    @PostMapping("/export")
    public void exportQuestions(@RequestBody int questionId) {
        AssignmentQuestion assignmentQuestion = assignmentQuestionRepository.findById(questionId).orElseThrow();
        if (assignmentQuestion.getSourceQuestionBankQuestion() != null) {
            throw new RuntimeException("Question is already exported");
        }
        AssignmentQuestion exportedQuestion = AssignmentQuestion.builder()
                .title(assignmentQuestion.getTitle())
                .question(assignmentQuestion.getQuestion())
                .createdAt(assignmentQuestion.getCreatedAt())
                .updatedAt(assignmentQuestion.getUpdatedAt())
                .questionType(assignmentQuestion.getQuestionType())
                .keepAnswersOrdered(assignmentQuestion.getKeepAnswersOrdered())
                .order(assignmentQuestion.getOrder())
                .answers(assignmentQuestion.getAnswers())
                .build();

        assignmentQuestionRepository.saveAndFlush(exportedQuestion);

        QuestionBankQuestion questionBankQuestion = QuestionBankQuestion.builder()
                .sourceQuestion(exportedQuestion)
                .build();

        questionBankQuestionRepository.saveAndFlush(questionBankQuestion);

        assignmentQuestion.setSourceQuestionBankQuestion(questionBankQuestion);
        assignmentQuestionRepository.saveAndFlush(assignmentQuestion);

    }
    @GetMapping("/getByIds")
    public ResponseEntity<List<AssignmentQuestionProjection>> getQuestionsByIds(@RequestParam List<Integer> ids) {
        List<AssignmentQuestionProjection> questions = assignmentQuestionRepository.findAllById(ids).stream().map(
                assignmentQuestionProjectionConverter::convert).collect(Collectors.toList());
        return ResponseEntity.ok(questions);
    }
    @PostMapping("update-question")
    public ResponseEntity<AssignmentQuestion> updateQuestion(@RequestBody AssignmentQuestion assignmentQuestion) {
        AssignmentQuestion updatedQuestion = assignmentQuestionRepository.save(assignmentQuestion);
        return ResponseEntity.ok(updatedQuestion);
    }
}
