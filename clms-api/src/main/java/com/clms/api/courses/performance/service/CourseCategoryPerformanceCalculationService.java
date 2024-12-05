package com.clms.api.courses.performance.service;

import com.clms.api.assignments.api.entity.Assignment;
import com.clms.api.assignments.api.repository.AssignmentRepository;
import com.clms.api.assignments.attempts.AssignmentAttemptRepository;
import com.clms.api.assignments.attempts.models.AssignmentAttempt;
import com.clms.api.courses.members.CourseMember;
import com.clms.api.courses.performance.dto.CourseCategoryPerformanceDto;
import com.clms.api.courses.performance.dto.TimestampedCategoryPerformanceDto;
import com.clms.api.questionBank.api.entity.QuestionBankCategory;
import com.clms.api.questionBank.api.entity.QuestionBankQuestion;
import com.clms.api.questionBank.api.repositories.QuestionBankQuestionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class CourseCategoryPerformanceCalculationService {
    private final AssignmentRepository assignmentRepository;
    private final AssignmentAttemptRepository assignmentAttemptRepository;
    private final QuestionBankQuestionRepository questionBankQuestionRepository;
    public CourseCategoryPerformanceDto calculate(CourseMember courseMember) {
        log.info("Calculating course category performance for user ({}) in course ({}).", courseMember.getId().getUser().getId(), courseMember.getId().getCourse().getId());
        CourseCategoryPerformanceDto courseCategoryPerformanceDto = new CourseCategoryPerformanceDto();

        List<TimestampedCategoryPerformanceDto> assignmentCategoryPerformance = getPerformanceOnAssignments(courseMember);
        courseCategoryPerformanceDto.setCategoryPerformances(assignmentCategoryPerformance);
        return courseCategoryPerformanceDto;
    }

    private List<TimestampedCategoryPerformanceDto> getPerformanceOnAssignments(CourseMember courseMember) {
        List<TimestampedCategoryPerformanceDto> categoryPerformance = new ArrayList<>();
        // get all assignments in the course
        List<Assignment> allAssignments = assignmentRepository.findAllByCourse(courseMember.getId().getCourse());

        List<Assignment> pastStartAssignments = allAssignments
                .stream()
                .filter(assignment -> assignment.getStartDate() != null && assignment.getStartDate().before(Date.from(Instant.now())))
                .toList();

        class CalculationHelperObject {
            Integer frequency = 0;
            Integer correctOccurrences = 0;
            Instant timestamp = null;
        }

        HashMap<QuestionBankCategory, Date> firstCategoryOccurance = new HashMap<>();

        pastStartAssignments.forEach(assignment -> {
            List<AssignmentAttempt> attempts = assignmentAttemptRepository.findAssignmentAttemptsByUserAndAssignment(courseMember.getId().getUser(), assignment);
            HashMap<QuestionBankCategory, CalculationHelperObject> categoryPerformanceMap = new HashMap<>();
            HashMap<Integer, Set<QuestionBankCategory>> questionCategoryMap = new HashMap<>();

            assignment.getQuestions().forEach(question -> {
                Integer sourceId = question.getSourceQuestionBankQuestionId();
                if (sourceId == null) {
                    return;
                }
                QuestionBankQuestion sourceQuestion = questionBankQuestionRepository.findById(sourceId).orElse(null);
                if (sourceQuestion == null) {
                    return;
                }

                Set<QuestionBankCategory> categories = sourceQuestion.getCategories();
                if (categories.isEmpty()) {
                    return;
                }

                for (QuestionBankCategory category : categories) {
                    if (firstCategoryOccurance.containsKey(category) && assignment.getStartDate().before(firstCategoryOccurance.get(category))) {
                        firstCategoryOccurance.put(category, assignment.getStartDate());
                    } else {
                        firstCategoryOccurance.put(category, assignment.getStartDate());
                    }
                }
                questionCategoryMap.put(question.getId(), categories);
            });

            firstCategoryOccurance.entrySet().forEach(item -> {
                TimestampedCategoryPerformanceDto timestampedCategoryPerformanceDto = TimestampedCategoryPerformanceDto
                        .builder()
                        .timestamp(item.getValue().toInstant())
                        .categoryId(item.getKey().getId())
                        .performanceScore(0)
                        .build();
                categoryPerformance.add(timestampedCategoryPerformanceDto);
            });


            attempts.forEach(attempt -> {
                HashMap<QuestionBankCategory, CalculationHelperObject> attemptCategoryPerformanceMap = new HashMap<>();
                attempt.getAnswers().forEach(answer -> {
                    if (questionCategoryMap.getOrDefault(answer.getQuestionId(), null) == null) {
                        // question does not have a category, skip
                        return;
                    }
                    Boolean wasCorrect = answer.isSelectedAnswerCorrect();
                    questionCategoryMap.get(answer.getQuestionId()).forEach(category -> {
                        CalculationHelperObject performance = attemptCategoryPerformanceMap.getOrDefault(category, new CalculationHelperObject());
                        if (performance.timestamp == null) {
                            performance.timestamp = attempt.getSubmittedAt();
                        }
                        performance.frequency++;
                        performance.correctOccurrences += wasCorrect ? 1 : 0;
                        attemptCategoryPerformanceMap.put(category, performance);
                    });
                });

                attemptCategoryPerformanceMap.entrySet().forEach(entry -> {
                    QuestionBankCategory category = entry.getKey();
                    CalculationHelperObject performance = entry.getValue();
                    TimestampedCategoryPerformanceDto timestampedCategoryPerformanceDto = TimestampedCategoryPerformanceDto
                            .builder()
                            .timestamp(performance.timestamp)
                            .categoryId(category.getId())
                            .build();
                    if (performance.frequency == 0) {
                        timestampedCategoryPerformanceDto.setPerformanceScore(0);
                    } else {
                        timestampedCategoryPerformanceDto.setPerformanceScore((performance.correctOccurrences.doubleValue() / performance.frequency.doubleValue()) * 100);
                    }
                    categoryPerformance.add(timestampedCategoryPerformanceDto);
                });
            });
        });

        return categoryPerformance;
    }
}
