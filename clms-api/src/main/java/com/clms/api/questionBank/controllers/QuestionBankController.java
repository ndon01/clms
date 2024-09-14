package com.clms.api.questionBank.controllers;

import com.clms.api.questionBank.models.QuestionBankCategory;
import com.clms.api.questionBank.models.QuestionBankQuestion;
import com.clms.api.questionBank.repositories.QuestionBankCategoryRepository;
import com.clms.api.questionBank.repositories.QuestionBankQuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/questionBank")
@RequiredArgsConstructor
public class QuestionBankController {
    private final QuestionBankQuestionRepository questionBankQuestionRepository;
    private final QuestionBankCategoryRepository questionBankCategoryRepository;
    @GetMapping("/questions")//gets all questions
    public List<QuestionBankQuestion> getQuestions() {
        return questionBankQuestionRepository.findAll();
    }

    @GetMapping("/categories")//gets all categories
    public List<QuestionBankCategory> getCategories() {
        return questionBankCategoryRepository.findAll();
    }
    @RequestMapping(value = "/questions", method = {RequestMethod.POST, RequestMethod.PUT})
    public QuestionBankQuestion addQuestion(@RequestBody QuestionBankQuestion question) {
        return questionBankQuestionRepository.save(question);
    }
    @RequestMapping(value = "/categories", method = {RequestMethod.POST, RequestMethod.PUT})
    public QuestionBankCategory addCategory(@RequestBody QuestionBankCategory category) {
        return questionBankCategoryRepository.save(category);
    }
}
