package com.clms.api.questionBank.categories;

import com.clms.api.assignments.AssignmentQuestionRepository;
import com.clms.api.questionBank.categories.dto.CategoryCreateRequestDto;
import com.clms.api.questionBank.categories.dto.CategoryDeleteRequestDto;
import com.clms.api.questionBank.categories.dto.CategoryReparentRequestDto;
import com.clms.api.questionBank.categories.dto.CategoryUpdateNameRequestDto;
import com.clms.api.questionBank.entity.QuestionBankCategory;
import com.clms.api.questionBank.repositories.QuestionBankCategoryRepository;
import com.clms.api.questionBank.repositories.QuestionBankQuestionRepository;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/question-bank/categories")
@RequiredArgsConstructor
@Tag(name = "Question Bank", description = "Endpoints for managing questions and categories")
public class QuestionBankCategoriesController {
    private final QuestionBankQuestionRepository questionBankQuestionRepository;
    private final QuestionBankCategoryRepository questionBankCategoryRepository;
    private final AssignmentQuestionRepository assignmentQuestionRepository;

    @GetMapping("/categories")//gets all categories
    public List<QuestionBankCategory> getCategories() {
        return questionBankCategoryRepository.findAll();
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

