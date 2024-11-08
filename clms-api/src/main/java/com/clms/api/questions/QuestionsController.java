package com.clms.api.questions;

import com.clms.api.assignments.AssignmentQuestion;
import com.clms.api.assignments.AssignmentQuestionRepository;
import com.clms.api.questionBank.models.QuestionBankQuestion;
import com.clms.api.questionBank.repositories.QuestionBankQuestionRepository;
import com.clms.api.questions.api.events.QuestionGenerationOrderEvent;
import com.clms.api.questions.dto.QuestionsFromYoutubeVideoRequest;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

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

    @PostMapping("/generate-from-youtube-video")
    public ResponseEntity<String> generateQuestions(@RequestBody QuestionsFromYoutubeVideoRequest request) {
        if (!questionGenerationConfiguration.isEnabled()) {
            return ResponseEntity.badRequest().body("Question generation is disabled.");
        }

        String videoUrl = request.getVideoUrl();

        questionGenerationService.generateFromYoutubeVideo(videoUrl);
        return ResponseEntity.ok("Questions are being generated from the video. This may take a while.");
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
        if(assignmentQuestion.getSourceQuestionBankQuestion() != null) {
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
}
