package com.clms.api.questionBank.controllers;

import com.clms.api.assignments.AssignmentQuestion;
import com.clms.api.assignments.AssignmentQuestionRepository;
import com.clms.api.questionBank.models.QuestionBankCategory;
import com.clms.api.questionBank.models.QuestionBankQuestion;
import com.clms.api.questionBank.repositories.QuestionBankCategoryRepository;
import com.clms.api.questionBank.repositories.QuestionBankQuestionRepository;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.transaction.Transactional;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/question-bank")
@RequiredArgsConstructor
@Tag(name = "Question Bank", description = "Endpoints for managing questions and categories")
public class QuestionBankController {
    private final QuestionBankQuestionRepository questionBankQuestionRepository;
    private final QuestionBankCategoryRepository questionBankCategoryRepository;
    private final AssignmentQuestionRepository assignmentQuestionRepository;
    @GetMapping("/questions")//gets all questions
    public List<QuestionBankQuestion> getQuestions() {
        return questionBankQuestionRepository.findAll();
    }

    @RequestMapping(value = "/questions", method = {RequestMethod.POST, RequestMethod.PUT})
    public QuestionBankQuestion addQuestion(@RequestBody QuestionBankQuestion question) {
        return questionBankQuestionRepository.save(question);
    }

    @GetMapping("/categories")//gets all categories
    public List<QuestionBankCategory> getCategories() {
        return questionBankCategoryRepository.findAll();
    }

    @RequestMapping(value = "/categories", method = {RequestMethod.POST, RequestMethod.PUT})
    public QuestionBankCategory addCategory(@RequestBody QuestionBankCategory category) {
        return questionBankCategoryRepository.save(category);
    }

    @PostMapping("/categories/reparent")//reparent a category
    public ResponseEntity reparentCategory(@RequestBody CategoryReparentRequestDto request) {
        QuestionBankCategory category = questionBankCategoryRepository.findById(request.getCategoryId()).orElse(null);
        if (category == null) {
            throw new RuntimeException("Category not found");
        }

        Integer newParentId = request.getNewParentId();
        category.setParentId(newParentId);
        questionBankCategoryRepository.save(category);

        return ResponseEntity.ok().build();
    }
    @PostMapping("/categories/create")
    public ResponseEntity createCategory(@RequestBody CategoryCreateRequestDto category) {
        questionBankCategoryRepository.save(QuestionBankCategory.builder()
                .categoryName(category.getCategoryName())
                .parentId(category.getParentId())
                .build());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/categories/update-name")
    public ResponseEntity updateCategoryName(@RequestBody CategoryUpdateNameRequestDto request) {
        QuestionBankCategory category = questionBankCategoryRepository.findById(request.getCategoryId()).orElse(null);
        if (category == null) {
            throw new RuntimeException("Category not found");
        }

        category.setCategoryName(request.getCategoryName());
        questionBankCategoryRepository.save(category);

        return ResponseEntity.ok().build();
    }

    @PostMapping("/categories/delete")
    @Transactional
    public ResponseEntity deleteCategory(@RequestBody CategoryDeleteRequestDto request) {
        QuestionBankCategory category = questionBankCategoryRepository.findById(request.getCategoryId()).orElse(null);
        if (category == null) {
            throw new RuntimeException("Category not found");
        }

        List<QuestionBankCategory> children = questionBankCategoryRepository.findAllByParentId(category.getId());

        for (QuestionBankCategory child : children) {
            child.setParentId(category.getParentId());
            questionBankCategoryRepository.save(child);
        }

        questionBankCategoryRepository.delete(category);

        return ResponseEntity.ok().build();
    }

}

@Getter
@Setter
class CategoryReparentRequestDto {
    private Integer categoryId;
    private Integer newParentId;
}

@Getter
@Setter
class CategoryCreateRequestDto {
    private String categoryName;
    private Integer parentId;
}
@Data
class CategoryUpdateNameRequestDto {
    private Integer categoryId;
    private String categoryName;
}
@Data
class CategoryDeleteRequestDto {
    private Integer categoryId;
}