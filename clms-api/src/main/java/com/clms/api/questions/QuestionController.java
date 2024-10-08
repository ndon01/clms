package com.clms.api.questions;

import com.clms.api.answers.AnswerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/questions")
public class QuestionController {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private AnswerRepository answerRepository;

    @GetMapping
    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Question> getQuestionById(@PathVariable Integer id) {
        Optional<Question> question = questionRepository.findById(id);
        return question.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Question createQuestion(@RequestBody Question question) {
        question.setCreatedAt(LocalDateTime.now());
        question.setUpdatedAt(LocalDateTime.now());
        return questionRepository.save(question);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Question> updateQuestion(@PathVariable Integer id, @RequestBody Question questionDetails) {
        Optional<Question> question = questionRepository.findById(id);
        if (question.isPresent()) {
            Question existingQuestion = question.get();
            existingQuestion.setQuestion(questionDetails.getQuestion());
            existingQuestion.setUpdatedAt(LocalDateTime.now());
            Question updatedQuestion = questionRepository.save(existingQuestion);
            return ResponseEntity.ok(updatedQuestion);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Integer id) {
        Optional<Question> question = questionRepository.findById(id);
        if (question.isPresent()) {
            questionRepository.delete(question.get());
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
