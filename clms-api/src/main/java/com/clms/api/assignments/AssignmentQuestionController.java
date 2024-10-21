package com.clms.api.assignments;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/assignment-questions")
public class AssignmentQuestionController {

    @Autowired
    private AssignmentQuestionRepository questionRepository;

    @Autowired
    private AssignmentRepository assignmentRepository;  // Add Assignment repository for fetching Assignment by ID

    private static final Logger logger = LoggerFactory.getLogger(AssignmentQuestionController.class);

    // Get all questions
    @GetMapping
    public List<AssignmentQuestion> getAllQuestions() {
        return questionRepository.findAll();
    }

    // Get question by ID
    @GetMapping("/{id}")
    public ResponseEntity<AssignmentQuestion> getQuestionById(@PathVariable int id) {
        Optional<AssignmentQuestion> question = questionRepository.findById(id);
        return question.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Create a new question, but receive assignment_id instead of the entire Assignment object
    @PostMapping
    public ResponseEntity<AssignmentQuestion> createQuestion(@RequestBody AssignmentQuestionRequest request) {
        Optional<Assignment> assignmentOptional = assignmentRepository.findById(request.getAssignmentId());
        // Log the type of the 'answers' field
        if (request.getAnswers() != null) {
            logger.info("Type of 'answers' field: {}", request.getAnswers().getClass().getName());
            if (!request.getAnswers().isEmpty()) {
                logger.info("Type of elements in 'answers': {}", request.getAnswers().get(0).getClass().getName());
            }
        } else {
            logger.info("'answers' field is null");
        }
        if (assignmentOptional.isPresent()) {
            AssignmentQuestion question = new AssignmentQuestion();
            question.setQuestion(request.getQuestion());
            question.setTitle(request.getTitle());
            question.setQuestionType(request.getQuestionType());
            question.setCreatedAt(request.getCreatedAt());
            question.setUpdatedAt(request.getUpdatedAt());
            question.setAssignment(assignmentOptional.get());
            question.setKeepAnswersOrdered(request.getKeepAnswersOrdered() || false);
            question.setOrder(request.getOrder());

            // Manually convert answers to JSON
            try {
                ObjectMapper objectMapper = new ObjectMapper();
                String answersJson = objectMapper.writeValueAsString(request.getAnswers());
                question.setAnswers(objectMapper.readValue(answersJson,
                        objectMapper.getTypeFactory().constructCollectionType(List.class, AssignmentQuestionAnswer.class)));
            } catch (JsonProcessingException e) {
                return ResponseEntity.badRequest().body(null);
            }

            return ResponseEntity.ok(questionRepository.save(question));
        } else {
            return ResponseEntity.badRequest().body(null);
        }
    }

    // Update a question, but receive assignment_id instead of the entire Assignment object
    @PutMapping("/{id}")
    public ResponseEntity<AssignmentQuestion> updateQuestion(@PathVariable int id, @RequestBody AssignmentQuestionRequest request) {
        Optional<AssignmentQuestion> questionOptional = questionRepository.findById(id);
        if (questionOptional.isPresent()) {
            AssignmentQuestion question = questionOptional.get();
            question.setQuestion(request.getQuestion());
            question.setTitle(request.getTitle());
            question.setQuestionType(request.getQuestionType());
            question.setAnswers(request.getAnswers());
            question.setCreatedAt(request.getCreatedAt());
            question.setUpdatedAt(request.getUpdatedAt());
            question.setKeepAnswersOrdered(request.getKeepAnswersOrdered() || false);
            question.setOrder(request.getOrder());

            // Check if the assignment ID is valid
            Optional<Assignment> assignmentOptional = assignmentRepository.findById(request.getAssignmentId());
            if (assignmentOptional.isPresent()) {
                question.setAssignment(assignmentOptional.get());
                // Log success before saving
                System.out.println("Updating question with ID: " + id);
                return ResponseEntity.ok(questionRepository.save(question));
            } else {
                // Log the error cause
                System.out.println("Invalid assignment ID: " + request.getAssignmentId());
                return ResponseEntity.badRequest().body(null);
            }
        } else {
            // Log the missing question scenario
            System.out.println("Question not found with ID: " + id);
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/bulk-update")
    public ResponseEntity<List<AssignmentQuestion>> bulkUpdateQuestions(@RequestBody List<AssignmentQuestionRequest> requests) {
        List<AssignmentQuestion> updatedQuestions = new ArrayList<>();

        for (AssignmentQuestionRequest request : requests) {
            Optional<AssignmentQuestion> questionOptional = questionRepository.findById(request.getId());
            if (questionOptional.isPresent()) {
                AssignmentQuestion question = questionOptional.get();
                question.setQuestion(request.getQuestion());
                question.setTitle(request.getTitle());
                question.setQuestionType(request.getQuestionType());
                question.setAnswers(request.getAnswers());
                question.setCreatedAt(request.getCreatedAt());
                question.setUpdatedAt(request.getUpdatedAt());
                question.setKeepAnswersOrdered(request.getKeepAnswersOrdered() || false);
                question.setOrder(request.getOrder());
                updatedQuestions.add(question);
            }
        }

        return ResponseEntity.ok(questionRepository.saveAll(updatedQuestions));
    }

    // Delete a question
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable int id) {
        Optional<AssignmentQuestion> questionOptional = questionRepository.findById(id);
        if (questionOptional.isPresent()) {
            questionRepository.delete(questionOptional.get());
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
