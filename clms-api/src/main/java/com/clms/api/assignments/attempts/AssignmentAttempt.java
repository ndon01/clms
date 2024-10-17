package com.clms.api.assignments.attempts;

import com.clms.api.assignments.Assignment;
import com.clms.api.common.domain.User;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "assignment_attempts")
@Getter
@Setter
public class AssignmentAttempt {

    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assignment_id", nullable = false)
    private Assignment assignment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column
    @Enumerated(EnumType.STRING)
    private AssignmentAttemptStatus status;

    private Date startedAt;
}

enum AssignmentAttemptStatus {
    IN_PROGRESS,
    SUBMITTED
}