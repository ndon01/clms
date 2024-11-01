package com.clms.api.questions;

import com.clms.api.questions.api.entity.QuestionGenerationOrderRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class QuestionGenerationOrderTimeoutScheduler {

    private final QuestionGenerationOrderRepository questionGenerationOrderRepository;

    // @Scheduled(fixedRate = 60000)
    public void cleanupTimedOutOrders() {

        // todo: implement this method
        /*
            once in a while the question generation order will fail,
            and the order will be stuck in the "IN_PROGRESS" or "INITIALIZED" state
            if these orders are not completed within a certain time frame,
            we should mark them as "FAILED" and log the error
         */

    }
}
