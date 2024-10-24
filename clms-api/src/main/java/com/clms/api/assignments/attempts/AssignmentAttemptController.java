package com.clms.api.assignments.attempts;

import com.clms.api.assignments.Assignment;
import com.clms.api.assignments.AssignmentQuestion;
import com.clms.api.assignments.AssignmentRepository;
import com.clms.api.assignments.attempts.DTO.AssignmentQuestionUpdateRequest;
import com.clms.api.assignments.attempts.DTO.SubmitAssignmentAttemptRequest;
import com.clms.api.assignments.attempts.models.AssignmentAttempt;
import com.clms.api.assignments.attempts.models.AssignmentAttemptStatus;
import com.clms.api.assignments.attempts.DTO.StartAssignmentAttemptRequest;
import com.clms.api.assignments.attempts.DTO.StartAssignmentAttemptResponse;
import com.clms.api.assignments.attempts.models.AttemptQuestionAnswer;
import com.clms.api.common.domain.User;
import com.clms.api.common.security.currentUser.CurrentUser;
import com.clms.api.common.security.requiresUser.RequiresUser;
import com.clms.api.common.domain.Course;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/assignments/attempts")
@RequiredArgsConstructor
@Slf4j
@RequiresUser
public class AssignmentAttemptController {

    private final AssignmentRepository assignmentRepository;
    private final AssignmentAttemptRepository assignmentAttemptRepository;
    private final AssignmentAttemptService assignmentAttemptService;

    @PostMapping("/start-attempt")
    public ResponseEntity<?> startAttempt(@CurrentUser User user, @RequestBody StartAssignmentAttemptRequest startAssignmentRequest) {
        Assignment assignment = assignmentRepository.findById(startAssignmentRequest.getAssignmentId()).orElse(null);
        List<AssignmentAttempt> assignmentAttempts = assignmentAttemptRepository.findAssignmentAttemptByUserAndAssignment(user, assignment);

        if (assignment == null) {
            return ResponseEntity.notFound().build();
        }

        Course course = assignment.getCourse();
        if (course == null) {
            return ResponseEntity.notFound().build();
            //TODO FIX THIS ONCE WE CAN MAKE AN ASSIGNMENT OUTSIDE OF A COURSE
        }

        AssignmentAttempt currentAttempt = assignmentAttempts.stream().filter(attempt -> attempt.getStatus() == AssignmentAttemptStatus.IN_PROGRESS).findFirst().orElse(null);
        if (currentAttempt != null) {
            return ResponseEntity.status(302).body(StartAssignmentAttemptResponse.builder().attemptId(currentAttempt.getId().toString()).build());

        }

        if (assignment.getMaxAttempts() <= assignmentAttempts.size()) {
            return ResponseEntity.badRequest().build();
            //SORRY YOU HAVE USED ALL YOUR ATTEMPTS
        }


        AssignmentAttempt newAssignmentAttempt = new AssignmentAttempt();
        newAssignmentAttempt.setAssignment(assignment);
        newAssignmentAttempt.setUser(user);
        newAssignmentAttempt.setStatus(AssignmentAttemptStatus.IN_PROGRESS);
        newAssignmentAttempt.setStartedAt(new Date());
        newAssignmentAttempt.setAnswers(new ArrayList<>());
        for (AssignmentQuestion question : assignment.getQuestions()) {
            AttemptQuestionAnswer attemptQuestionAnswer = new AttemptQuestionAnswer();
            attemptQuestionAnswer.setQuestionId(question.getId());
            attemptQuestionAnswer.setSelectedAnswerId("");
            newAssignmentAttempt.getAnswers().add(attemptQuestionAnswer);
        }

        assignmentAttemptRepository.saveAndFlush(newAssignmentAttempt);

        return ResponseEntity.status(201).body(StartAssignmentAttemptResponse.builder().attemptId(newAssignmentAttempt.getId().toString()).build());


    }
    @PostMapping("/update-question-attempt")
    public ResponseEntity<?> updateQuestionAnswer(@CurrentUser User user ,@RequestBody AssignmentQuestionUpdateRequest updateAssignmentRequest){
        AssignmentAttempt assignmentAttempt =  assignmentAttemptService.getActiveAttemptsForUserByAssignmentID(user,updateAssignmentRequest.getAssignmentId());
        if(assignmentAttempt == null){
            return ResponseEntity.notFound().build();
        }
        //TODO UPDATE ANSWER
        List<AttemptQuestionAnswer> attemptQuestionAnswers = assignmentAttempt.getAnswers();
        boolean replacedAnswer = false;
        for(AttemptQuestionAnswer answer : attemptQuestionAnswers){
            if(answer.getQuestionId() == (updateAssignmentRequest.getQuestionId())){
                replacedAnswer = true;
                answer.setSelectedAnswerId(updateAssignmentRequest.getSelectedAnswerId());
                break;
            }
        }
        if(!replacedAnswer){
            return ResponseEntity.notFound().build();
        }
        assignmentAttempt.setAnswers(attemptQuestionAnswers);
        assignmentAttemptRepository.saveAndFlush(assignmentAttempt);
        return ResponseEntity.status(201).build();

    }

    @PostMapping("/submit-attempt")
    public ResponseEntity<?> submitCurrentAttempt(@CurrentUser User user, @RequestBody SubmitAssignmentAttemptRequest submitAssignmentRequest) {
        int userId = user.getId();
        Assignment assignment = assignmentRepository.findById(submitAssignmentRequest.getAssignmentId()).orElse(null);

        if (assignment == null) {
            return ResponseEntity.notFound().build();
        }


        Course courseAssignment = null;

        if (courseAssignment == null) {
            return ResponseEntity.notFound().build();
            //TODO FIX THIS ONCE WE CAN MAKE AN ASSIGNMENT OUTSIDE OF A COURSE
        }


        //TODO CHANGE STATE FROM 'IN PROGRESS' TO 'COMPLETED'
        //TODO SEND TO REPORT CONTROLLER
        return ResponseEntity.status(201).build();
    }

}

