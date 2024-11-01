package com.clms.api.questions;

import com.clms.api.questions.api.entity.QuestionGenerationOrderEntity;
import com.clms.api.questions.api.entity.QuestionGenerationOrderRepository;
import com.clms.api.questions.api.entity.QuestionGenerationOrderState;
import com.clms.api.questions.api.events.QuestionGenerationOrderEvent;
import com.clms.api.questions.api.events.services.QuestionGenerationOrderEventPublication;
import com.clms.api.questions.generation.QuestionGenerationHandler;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class QuestionGenerationOrderEventHandler {

    private final QuestionGenerationOrderEventPublication questionGenerationOrderEventPublication;
    private final QuestionGenerationOrderRepository questionGenerationOrderRepository;
    private final List<QuestionGenerationHandler> questionGenerationHandlers;

    private static final int MAXIMUM_RETRY_ATTEMPTS = 3;
    public void handle(QuestionGenerationOrderEvent event) {
        QuestionGenerationOrderEntity order = null;
        try {

            order = questionGenerationOrderRepository.findById(event.getQuestionGenerationOrderId()).orElseThrow();
            QuestionGenerationOrderEntity finalOrder = order;
            QuestionGenerationHandler handler = questionGenerationHandlers.stream()
                    .filter(h -> { return h.canHandle(finalOrder); })
                    .findFirst()
                    .orElseThrow(() -> new IllegalStateException("No handler found for order: " + finalOrder.getId()));
            handler.handle(order);

        } catch (Exception e) {
            log.error("Error processing question generation order", e);
            event.setAttempt(event.getAttempt() + 1);
            if (event.getAttempt() < MAXIMUM_RETRY_ATTEMPTS) {
                log.info("Retrying event: {}", event);
                questionGenerationOrderEventPublication.publish(event);
            } else {
                log.error("Failed to process event after {} attempts: {}", MAXIMUM_RETRY_ATTEMPTS, event);
                if (order != null) {
                    order.setOrderState(QuestionGenerationOrderState.FAILED);
                    questionGenerationOrderRepository.saveAndFlush(order);
                }
            }
        }
    }
}
