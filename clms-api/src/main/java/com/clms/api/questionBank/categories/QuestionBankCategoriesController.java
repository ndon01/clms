package com.clms.api.questionBank.categories;

import com.clms.api.assignments.api.repository.AssignmentQuestionRepository;
import com.clms.api.questionBank.api.projections.QuestionBankCategoryProjection;
import com.clms.api.questionBank.api.projections.converters.QuestionBankCategoryProjectionConverter;
import com.clms.api.questionBank.categories.dto.CategoryCreateRequestDto;
import com.clms.api.questionBank.categories.dto.CategoryDeleteRequestDto;
import com.clms.api.questionBank.categories.dto.CategoryReparentRequestDto;
import com.clms.api.questionBank.categories.dto.CategoryUpdateNameRequestDto;
import com.clms.api.questionBank.api.entity.QuestionBankCategory;
import com.clms.api.questionBank.api.repositories.QuestionBankCategoryRepository;
import com.clms.api.questionBank.api.repositories.QuestionBankQuestionRepository;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/question-bank/categories")
@RequiredArgsConstructor
@Tag(name = "Question Bank", description = "Endpoints for managing questions and categories")
public class QuestionBankCategoriesController {
    private final QuestionBankQuestionRepository questionBankQuestionRepository;
    private final QuestionBankCategoryRepository questionBankCategoryRepository;
    private final AssignmentQuestionRepository assignmentQuestionRepository;
    private final QuestionBankCategoryProjectionConverter questionBankCategoryProjectionConverter;
    @GetMapping
    public List<QuestionBankCategoryProjection> getCategories() {
        return questionBankCategoryRepository.findAll().stream().map(questionBankCategoryProjectionConverter::convert).collect(Collectors.toList());
    }

    @PostMapping("/reparent")//reparent a category
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
    @PostMapping("/create")
    public ResponseEntity createCategory(@RequestBody CategoryCreateRequestDto category) {
        questionBankCategoryRepository.save(QuestionBankCategory.builder()
                .categoryName(category.getCategoryName())
                .parentId(category.getParentId())
                .build());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/update-name")
    public ResponseEntity updateCategoryName(@RequestBody CategoryUpdateNameRequestDto request) {
        QuestionBankCategory category = questionBankCategoryRepository.findById(request.getCategoryId()).orElse(null);
        if (category == null) {
            throw new RuntimeException("Category not found");
        }

        category.setCategoryName(request.getCategoryName());
        questionBankCategoryRepository.save(category);

        return ResponseEntity.ok().build();
    }

    @PostMapping("/delete")
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

    @GetMapping("/get-bulk")
    public List<QuestionBankCategoryProjection> getBulkCategories(@RequestParam List<Integer> categoryIds) {
        return questionBankCategoryRepository.findAllById(categoryIds).stream().map(questionBankCategoryProjectionConverter::convert).collect(Collectors.toList());
    }

}

