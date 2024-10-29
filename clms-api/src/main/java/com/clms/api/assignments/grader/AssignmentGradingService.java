package com.clms.api.assignments.grader;

import com.clms.api.assignments.AssignmentQuestion;
import com.clms.api.assignments.AssignmentQuestionAnswer;
import com.clms.api.assignments.AssignmentQuestionRepository;
import com.clms.api.assignments.attempts.AssignmentAttemptRepository;
import com.clms.api.assignments.attempts.models.AssignmentAttempt;
import com.clms.api.assignments.attempts.models.AttemptQuestionAnswer;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AssignmentGradingService {
    private final AssignmentAttemptRepository attemptRepository;
    private final AssignmentQuestionRepository questionRepository;

    public void grade(AssignmentAttempt attempt){
        List<AttemptQuestionAnswer> questionAnswers = attempt.getAnswers();
        if (questionAnswers == null || questionAnswers.isEmpty()) {
            return;
        }
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
                attempt.setAnswersCorrect(attempt.getAnswersCorrect()+1);
                questionAnswer.setSelectedAnswerCorrect(true);
            }else{
                questionAnswer.setSelectedAnswerCorrect(false);
            }

        }
        attempt.setScorePercentage((double)(attempt.getAnswersCorrect() == null ? 0 : attempt.getAnswersCorrect())/questionAnswers.size()*100);
        attemptRepository.save(attempt);
    }
}
