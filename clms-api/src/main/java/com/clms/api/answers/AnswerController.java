package com.clms.api.answers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import com.clms.api.questions.Question;
import com.clms.api.questions.QuestionRepository;
@RestController
@RequestMapping("/api/answers")
public class AnswerController {

    @Autowired
    private AnswerRepository answerRepository;
    @Autowired QuestionRepository questionRepository;
    private static final Logger logger = LoggerFactory.getLogger(AnswerController.class);

    @GetMapping
    public List<Answer> getAllAnswers() {
        return answerRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Answer> getAnswerById(@PathVariable Integer id) {
        Optional<Answer> answer = answerRepository.findById(id);
        return answer.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Answer> createAnswer(@RequestBody Answer answer) {
        logger.info("Received request to create answer: {}", answer);
        Optional<Question> questionOptional = questionRepository.findById(answer.getQuestionId());
        if(!questionOptional.isPresent()){
            logger.info("Question with id {} not found", answer.getQuestionId());
            return ResponseEntity.notFound().build();
        }
        Question question = questionOptional.get();
        logger.info("Found question with ID {}: {}", answer.getQuestionId(), question.getQuestion());

        answer.setQuestion(question);
        answer.setCreatedAt(LocalDateTime.now());
        answer.setUpdatedAt(LocalDateTime.now());

        Answer savedAnswer = answerRepository.save(answer);
        logger.info("Successfully created answer: {}", savedAnswer);

        return ResponseEntity.ok(savedAnswer);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Answer> updateAnswer(@PathVariable Integer id, @RequestBody Answer answerDetails) {
        Optional<Answer> answer = answerRepository.findById(id);
        if (answer.isPresent()) {
            Answer existingAnswer = answer.get();
            existingAnswer.setAnswerText(answerDetails.getAnswerText());
            existingAnswer.setCorrect(answerDetails.isCorrect());
            existingAnswer.setUpdatedAt(LocalDateTime.now());
            Answer updatedAnswer = answerRepository.save(existingAnswer);
            return ResponseEntity.ok(updatedAnswer);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAnswer(@PathVariable Integer id) {
        Optional<Answer> answer = answerRepository.findById(id);
        if (answer.isPresent()) {
            answerRepository.delete(answer.get());
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
