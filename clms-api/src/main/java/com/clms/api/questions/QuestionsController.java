package com.clms.api.questions;

import com.clms.api.questions.api.events.QuestionGenerationOrderEvent;
import com.clms.api.questions.dto.QuestionsFromYoutubeVideoRequest;
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
public class QuestionsController {

    private final QuestionGenerationService questionGenerationService;
    private final QuestionGenerationOrderEventHandler questionGenerationOrderEventHandler;
    private final QuestionGenerationConfiguration questionGenerationConfiguration;

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
}
