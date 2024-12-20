package com.clms.api.assignments.attempts;

import com.clms.api.assignments.api.entity.AssignmentQuestion;
import com.clms.api.assignments.attempts.models.AssignmentAttempt;
import jakarta.persistence.*;
import lombok.Data;
import java.util.UUID;


@Entity
@Table(name = "assignment_question_attempts")
@Data
public class AssignmentQuestionAttempt {

    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assignment_attempt_id", nullable = false)
    private AssignmentAttempt assignmentAttempt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assignment_question_id", nullable = false)
    private AssignmentQuestion assignmentQuestion;

}
