package com.clms.api.assignments.grader;

import com.clms.api.adaptiveLearning.CategoryReccomendationData;
import com.clms.api.adaptiveLearning.CategoryReccomendationDataRepository;
import com.clms.api.assignments.api.entity.AssignmentQuestion;
import com.clms.api.assignments.api.entity.AssignmentQuestionAnswer;
import com.clms.api.assignments.api.repository.AssignmentQuestionRepository;
import com.clms.api.assignments.attempts.AssignmentAttemptRepository;
import com.clms.api.assignments.attempts.models.AssignmentAttempt;
import com.clms.api.assignments.attempts.models.AttemptQuestionAnswer;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AssignmentGradingService {
    private final AssignmentAttemptRepository attemptRepository;
    private final AssignmentQuestionRepository questionRepository;
    private final CategoryReccomendationDataRepository categoryReccomendationDataRepository;

    public void grade(AssignmentAttempt attempt){
        List<AttemptQuestionAnswer> questionAnswers = attempt.getAnswers();
        if (questionAnswers == null || questionAnswers.isEmpty()) {
            return;
        }
        Map<Integer, CategoryReccomendationData> categoryReccomendationDataHashMap = new HashMap<>();

        for (AttemptQuestionAnswer questionAnswer: questionAnswers) {
            AssignmentQuestion question = questionRepository.findById(questionAnswer.getQuestionId()).orElseThrow();
            //compare the answer with the correct answer in questions table
            UUID correctAnswer = question.getAnswers().stream()
                    .filter(AssignmentQuestionAnswer::isCorrect)
                    .map(AssignmentQuestionAnswer::getId)
                    .findFirst()
                    .orElse(null);
            if (correctAnswer == null){
                continue;
            }
            if(correctAnswer.toString().equals(questionAnswer.getSelectedAnswerId())){
                if (attempt.getAnswersCorrect() == null) {
                    attempt.setAnswersCorrect(0);
                }
                attempt.setAnswersCorrect(attempt.getAnswersCorrect()+1);
                questionAnswer.setSelectedAnswerCorrect(true);
            }else{
                questionAnswer.setSelectedAnswerCorrect(false);
            }

            if(question.getSourceQuestionBankQuestion() != null){
                var categories = question.getSourceQuestionBankQuestion().getCategories();
                categories.forEach(category -> {
                    var data = categoryReccomendationDataHashMap.getOrDefault(category.getId(), categoryReccomendationDataRepository
                            .findByCategoryAndUser(category, attempt.getUser())
                            .orElse(CategoryReccomendationData
                                    .builder()
                                    .categoryFrequency(0L)
                                    .categoryScore(0L)
                                    .category(category)
                                    .user(attempt.getUser()).build()));
                    data.setCategoryFrequency(data.getCategoryFrequency() + 1);
                    if(questionAnswer.isSelectedAnswerCorrect()){
                        data.setCategoryScore(data.getCategoryScore() + 1);
                    }
                    categoryReccomendationDataHashMap.put(category.getId(), data);

                });

            }

        }
        categoryReccomendationDataRepository.saveAll(categoryReccomendationDataHashMap.values());
        attempt.setScorePercentage((double)(attempt.getAnswersCorrect() == null ? 0 : attempt.getAnswersCorrect())/questionAnswers.size()*100);
        attemptRepository.save(attempt);
    }
}
