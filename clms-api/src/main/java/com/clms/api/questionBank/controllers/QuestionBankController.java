package com.clms.api.questionBank.controllers;

import com.clms.api.questionBank.models.QuestionBankCategory;
import com.clms.api.questionBank.models.QuestionBankQuestion;
import com.clms.api.questionBank.repositories.QuestionBankQuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/questionBank")
@RequiredArgsConstructor
public class QuestionBankController {
    private final QuestionBankQuestionRepository questionBankQuestionRepository;
    @GetMapping("/questons")//gets all questions
    public List<QuestionBankQuestion> getQuestions() {
        return questionBankQuestionRepository.findAll();
    }
}
