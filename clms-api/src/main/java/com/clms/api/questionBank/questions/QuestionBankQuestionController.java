package com.clms.api.questionBank.questions;

import com.clms.api.common.web.util.PaginationRequest;
import com.clms.api.questionBank.api.projections.QuestionBankQuestionProjection;
import com.clms.api.questionBank.api.projections.converters.QuestionBankQuestionProejctionConverter;
import com.clms.api.questionBank.entity.QuestionBankQuestion;
import com.clms.api.questionBank.repositories.QuestionBankQuestionRepository;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/question-bank/questions")
@RequiredArgsConstructor
@Tag(name = "Question Bank", description = "Endpoints for managing questions and categories")
public class QuestionBankQuestionController {

    private final QuestionBankQuestionRepository questionBankQuestionRepository;
    private final QuestionBankQuestionProejctionConverter questionBankQuestionProejctionConverter;

    @GetMapping("/pageable")
    public Page<QuestionBankQuestionProjection> getQuestions(PaginationRequest paginationRequest) {
        return questionBankQuestionRepository
                .findAll(paginationRequest.toPageRequest())
                .map(questionBankQuestionProejctionConverter::convert);
    }
}
