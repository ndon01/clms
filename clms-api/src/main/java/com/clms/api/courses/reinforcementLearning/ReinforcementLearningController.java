package com.clms.api.courses.reinforcementLearning;

import com.clms.api.adaptiveLearning.CategoryReccomendationData;
import com.clms.api.adaptiveLearning.CategoryReccomendationDataRepository;
import com.clms.api.assignments.Assignment;
import com.clms.api.assignments.AssignmentQuestion;
import com.clms.api.assignments.AssignmentRepository;
import com.clms.api.common.security.currentUser.CurrentUser;
import com.clms.api.courses.CourseRepository;
import com.clms.api.courses.api.Course;
import com.clms.api.courses.members.CourseMember;
import com.clms.api.courses.members.CourseMemberRepository;
import com.clms.api.courses.performance.dto.CourseCategoryPerformanceDto;
import com.clms.api.courses.performance.dto.TimestampedCategoryPerformanceDto;
import com.clms.api.courses.performance.service.CourseCategoryPerformanceCalculationService;
import com.clms.api.courses.reinforcementLearning.repository.CategoryReinforcementAssignedQuestionRepository;
import com.clms.api.courses.reinforcementLearning.repository.CategoryReinforcementQuestionAttemptRepository;
import com.clms.api.questionBank.entity.QuestionBankCategory;
import com.clms.api.questionBank.entity.QuestionBankQuestion;
import com.clms.api.questionBank.repositories.QuestionBankCategoryRepository;
import com.clms.api.questionBank.repositories.QuestionBankQuestionRepository;
import com.clms.api.questions.api.projections.QuestionAnswerProjection;
import com.clms.api.questions.api.projections.QuestionProjection;
import com.clms.api.users.UserRepository;
import com.clms.api.users.api.User;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.weaver.patterns.TypePatternQuestions;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/courses/reinforcementLearning")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Reinforcement Learning", description = "Endpoints for reinforced learning within courses")
public class ReinforcementLearningController
{
    private final CourseRepository courseRepository;
    private final UserRepository userRepository;
    private final CourseCategoryPerformanceCalculationService courseCategoryPerformanceCalculationService;
    private final CourseMemberRepository courseMemberRepository;
    private final AssignmentRepository assignmentRepository;
    private final QuestionBankQuestionRepository questionBankQuestionRepository;
    private final QuestionBankCategoryRepository questionBankCategoryRepository;
    private final CategoryReinforcementAssignedQuestionRepository categoryReinforcementDataRepository;
    private final CategoryReinforcementQuestionAttemptRepository categoryReinforcementQuestionAttemptRepository;


    @GetMapping("/getReinforcementQuestion")
    public ResponseEntity<QuestionProjection> getReinforcementQuestion (@CurrentUser User user, @RequestParam Integer courseId)
    {
        Course course = courseRepository.findById(courseId).orElse(null);
        if (course == null) {
            return ResponseEntity.notFound().build();
        }

        if(user == null)
        {
            return ResponseEntity.notFound().build();
        }

        CourseMember courseMember = courseMemberRepository.findCourseMemberByCourseAndUser(course, user).orElse(null);
        if (courseMember == null) {
            return ResponseEntity.notFound().build();
        }

        CourseCategoryPerformanceDto courseCategoryPerformanceDto = courseCategoryPerformanceCalculationService.calculate(courseMember);
        List<TimestampedCategoryPerformanceDto> categoryPerformances = courseCategoryPerformanceDto.getCategoryPerformances();
        double minScore = categoryPerformances.get(0).getPerformanceScore();
        int categoryId = categoryPerformances.get(0).getCategoryId();
        for(TimestampedCategoryPerformanceDto categoryPerformance : categoryPerformances)
        {
            if(categoryPerformance.getPerformanceScore() < minScore)
            {
                minScore = categoryPerformance.getPerformanceScore();
                categoryId = categoryPerformance.getCategoryId();
            }
        }

        QuestionBankCategory category = questionBankCategoryRepository.findById(categoryId).orElse(null);

        List<QuestionBankQuestion> questions = questionBankQuestionRepository.findAllByCategories(category);
        if(questions.isEmpty())
        {
            return ResponseEntity.notFound().build();
        }

        //select a random question from the list
        int randomIndex = (int) (Math.random() * questions.size());
        QuestionBankQuestion question = questions.get(randomIndex);
        AssignmentQuestion assignmentQuestion = question.getSourceQuestion();


        return ResponseEntity.ok(QuestionProjection.builder()
                        .title(assignmentQuestion.getTitle())
                        .question(assignmentQuestion.getQuestion())
                        .questionType(assignmentQuestion.getQuestionType())
                        .answers(assignmentQuestion.getAnswers()
                                .stream()
                                .map(
                                        answer -> QuestionAnswerProjection.builder()
                                        .id(answer.getId())
                                        .text(answer.getText())
                                        .order(answer.getOrder())
                                        .build()
                                ).toList()
                        )
                        .keepAnswersOrdered(assignmentQuestion.getKeepAnswersOrdered())
                .build());
    }

}
