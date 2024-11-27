package com.clms.api.questionBank.questions;

import com.clms.api.assignments.AssignmentQuestion;
import com.clms.api.assignments.AssignmentQuestionRepository;
import com.clms.api.common.web.util.PageinationInformationDto;
import com.clms.api.common.web.util.PaginationRequest;
import com.clms.api.questionBank.api.projections.QuestionBankQuestionProjection;
import com.clms.api.questionBank.api.projections.converters.QuestionBankQuestionProejctionConverter;
import com.clms.api.questionBank.entity.QuestionBankCategory;
import com.clms.api.questionBank.entity.QuestionBankQuestion;
import com.clms.api.questionBank.repositories.QuestionBankCategoryRepository;
import com.clms.api.questionBank.repositories.QuestionBankQuestionRepository;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/question-bank/questions")
@RequiredArgsConstructor
@Tag(name = "Question Bank", description = "Endpoints for managing questions and categories")
public class QuestionBankQuestionController {

    private final QuestionBankQuestionRepository questionBankQuestionRepository;
    private final QuestionBankQuestionProejctionConverter questionBankQuestionProejctionConverter;
    private final AssignmentQuestionRepository assignmentQuestionRepository;
    private final QuestionBankCategoryRepository questionBankCategoryRepository;

    @GetMapping("/pageable")
    public List<QuestionBankQuestionProjection> getQuestions(@RequestParam(required = false, defaultValue = "1") Integer page,
                                                             @RequestParam(required = false, defaultValue = "10") Integer size,
                                                             @RequestParam(required = false) List<Integer> filterByCategoryIds) {
        PageRequest paginationRequest = PageRequest.of(page, size);
        List<QuestionBankQuestion> questions = null;
        if (filterByCategoryIds != null && !filterByCategoryIds.isEmpty()) {

            questions = questionBankQuestionRepository.findAllByCategoriesIn(
                    filterByCategoryIds.stream().map(id -> QuestionBankCategory.builder().id(id).build()).toList(),
                    paginationRequest);
        }else{
            questions = questionBankQuestionRepository.findAll(paginationRequest).toList();
        }
        return questions.stream().map(questionBankQuestionProejctionConverter::convert).toList();
    }

    @GetMapping(value = "/pageable/head")
    public ResponseEntity<PageinationInformationDto> getQuestionsHead(@RequestParam(required = false, defaultValue = "1") Integer page,
                                                                      @RequestParam(required = false, defaultValue = "10") Integer size,
                                                                      @RequestParam(required = false) List<Integer> filterByCategoryIds) {
        long totalRecords = 0;
        if (filterByCategoryIds == null || filterByCategoryIds.isEmpty()) {
            totalRecords = questionBankQuestionRepository.count();
        }
        else{
            totalRecords = questionBankQuestionRepository.countAllByCategoriesIn(filterByCategoryIds.stream().map(id -> QuestionBankCategory.builder().id(id).build()).toList());
        }

        PageinationInformationDto pageinationInformationDto = new PageinationInformationDto();
        pageinationInformationDto.setTotalRecords(totalRecords);
        return ResponseEntity.ok(pageinationInformationDto);
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


    @Getter
    @Setter
    private static class UpdateQuestionCategoriesRequestDto {
        private Integer questionId;
        private List<Integer> categoryIds;
    }

    @PostMapping("/categories/update")
    public ResponseEntity<?> updateQuestionCategories(@RequestBody UpdateQuestionCategoriesRequestDto request) {
        QuestionBankQuestion question = questionBankQuestionRepository.findById(request.getQuestionId()).orElse(null);
        if (question == null) {
            return ResponseEntity.badRequest().body("Question not found");
        }

        // Get current linked categories
        Set<QuestionBankCategory> currentCategories = new HashSet<>(question.getCategories());

        // Prepare updated categories
        Set<QuestionBankCategory> updatedCategories = new HashSet<>();

        // Retain categories that are in the request
        currentCategories.stream()
                .filter(category -> request.getCategoryIds().contains(category.getId()))
                .forEach(updatedCategories::add);

        // Add new categories from the request that are not in the current set
        request.getCategoryIds().stream()
                .filter(categoryId -> currentCategories.stream().noneMatch(category -> category.getId().equals(categoryId)))
                .forEach(categoryId -> {
                    QuestionBankCategory category = questionBankCategoryRepository.findById(categoryId).orElse(null);
                    if (category != null) {
                        updatedCategories.add(category);
                    }
                });

        // Update the question's categories
        question.setCategories(updatedCategories);
        questionBankQuestionRepository.save(question);

        return ResponseEntity.ok("Categories updated");
    }

}
