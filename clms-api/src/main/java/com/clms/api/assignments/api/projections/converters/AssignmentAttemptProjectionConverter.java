package com.clms.api.assignments.api.projections.converters;

import com.clms.api.assignments.api.projections.AssignmentAttemptProjection;
import com.clms.api.assignments.api.projections.AttemptQuestionAnswerProjection;
import com.clms.api.assignments.attempts.models.AssignmentAttempt;
import com.clms.api.assignments.attempts.models.AttemptQuestionAnswer;
import com.clms.api.common.interfaces.GenericConverter;
import com.clms.api.users.api.User;
import com.clms.api.users.api.projections.UserProjection;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AssignmentAttemptProjectionConverter implements GenericConverter<AssignmentAttempt, AssignmentAttemptProjection> {

    private final AssignmentProjectionConverter assignmentProjectionConverter;
    private final GenericConverter<User, UserProjection> userProjectionConverter;
    private final GenericConverter<AttemptQuestionAnswer, AttemptQuestionAnswerProjection> assignmentQuestionAnswerConverter;
    @Override
    public AssignmentAttemptProjection convert(AssignmentAttempt source) {
        return AssignmentAttemptProjection.builder()
                .id(source.getId().toString())
                .assignment(source.getAssignment() != null ? assignmentProjectionConverter.convert(source.getAssignment()) : null)
                .user(source.getUser() != null ? userProjectionConverter.convert(source.getUser()) : null)
                .status(source.getStatus())
                .startedAt(source.getStartedAt())
                .answers(source.getAnswers() != null ? source.getAnswers().stream().map(assignmentQuestionAnswerConverter::convert).toList() : null)
                .scorePercentage(source.getScorePercentage())
                .answersCorrect(source.getAnswersCorrect())
                .build();
    }
}
