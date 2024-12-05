package com.clms.api.adaptiveLearning;

import com.clms.api.assignments.api.repository.AssignmentQuestionRepository;
import com.clms.api.assignments.attempts.AssignmentAttemptRepository;
import com.clms.api.questionBank.api.entity.QuestionBankCategory;
import com.clms.api.questionBank.api.entity.QuestionBankQuestion;
import com.clms.api.questionBank.api.repositories.QuestionBankCategoryRepository;
import com.clms.api.questionBank.api.repositories.QuestionBankQuestionRepository;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/adaptive-learning")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "AdaptiveLearning", description = "Endpoints for adaptive learning")
public class AdaptiveLearningController {

    private final AssignmentQuestionRepository assignmentQuestionRepository;
    private final AssignmentAttemptRepository assignmentAttemptRepository;
    private final QuestionBankQuestionRepository questionBankQuestionRepository;
    private final CategoryReccomendationDataRepository categoryReccomendationDataRepository;
    private final QuestionBankCategoryRepository questionBankCategoryRepository;

    @GetMapping("/getReccomendation")
    public ResponseEntity<QuestionBankQuestion> getGeneralReccomendation(@RequestBody String userId) {
        List<CategoryReccomendationData> categoryReccomendationData = categoryReccomendationDataRepository.findAllByUserId(Integer.parseInt(userId));

        if (categoryReccomendationData.isEmpty()) {
            return ResponseEntity.noContent().build();
        }


        double failingScoreThreshold = 50.0; // Example threshold

        // Recommend a category based on the following criteria:
        // 1. If the score is failing, recommend that category.
        // 2. If no failing category, recommend the category with the worst (lowest) score, considering variance.

        QuestionBankCategory recommendedCategory = null;
        double minScore = Double.MAX_VALUE;
        for(CategoryReccomendationData data : categoryReccomendationData) {
            if(data.getCategoryScore() < failingScoreThreshold) {
                recommendedCategory = data.getCategory();
                break;
            }
            if(data.getCategoryScore() < minScore) {
                minScore = data.getCategoryScore();
                recommendedCategory = data.getCategory();
            }
        }

        QuestionBankQuestion question = null;
        if(recommendedCategory == null)
        {
            return ResponseEntity.badRequest().build();
        }
        List<QuestionBankQuestion> questions = recommendedCategory.getAssociatedQuestions();
        int size = questions.size();
        int random = (int) (Math.random() * size);
        question = questions.get(random);

        return ResponseEntity.ok(question);

    }

}