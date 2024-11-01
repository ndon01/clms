package com.clms.api.questions;

import com.clms.api.common.security.CurrentUserContextHolder;
import com.clms.api.questions.api.entity.QuestionGenerationOrderEntity;
import com.clms.api.questions.api.entity.QuestionGenerationOrderRepository;
import com.clms.api.questions.api.entity.QuestionGenerationOrderState;
import com.clms.api.questions.api.entity.QuestionGenerationOrderType;
import com.clms.api.questions.api.events.QuestionGenerationOrderEvent;
import com.clms.api.questions.api.events.services.QuestionGenerationOrderEventPublication;
import com.clms.api.questions.generation.QuestionGenerationHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class QuestionGenerationService {

    private final QuestionGenerationOrderRepository questionGenerationOrderRepository;
    private final QuestionGenerationOrderEventPublication questionGenerationOrderEventPublication;
    private static final Set<QuestionGenerationOrderState> InactiveOrderStates = Set.of(QuestionGenerationOrderState.COMPLETED, QuestionGenerationOrderState.CANCELLED, QuestionGenerationOrderState.FAILED);

    public void generateFromYoutubeVideo(String videoUrl) {
        this.verifyUserHasNoActiveOrders();

        Map<String, Object> orderDetails = Map.of(
                "videoUrl", videoUrl
        );

        QuestionGenerationOrderEntity order = QuestionGenerationOrderEntity.builder()
                .orderType(QuestionGenerationOrderType.YOUTUBE_VIDEO)
                .orderedBy(CurrentUserContextHolder.getCurrentUser())
                .orderDetails(orderDetails)
                .orderState(QuestionGenerationOrderState.INITIALIZED)
                .build();

        questionGenerationOrderRepository.saveAndFlush(order);

        questionGenerationOrderEventPublication.publish(QuestionGenerationOrderEvent.builder()
                .questionGenerationOrderId(order.getId())
                .build());
    }

    private void verifyUserHasNoActiveOrders() {
        if (questionGenerationOrderRepository.findAllByOrderedBy(CurrentUserContextHolder.getCurrentUser())
                .parallelStream()
                .anyMatch(order -> !InactiveOrderStates.contains(order.getOrderState()))) {
            throw new IllegalStateException("An active order already exists, please wait for it to complete before starting a new one.");
        }
    }
}
