package com.clms.api.assignments.api.projections.converters;

import com.clms.api.assignments.api.entity.Assignment;
import com.clms.api.assignments.api.projections.AssignmentProjection;
import com.clms.api.common.interfaces.GenericConverter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AssignmentProjectionConverter implements GenericConverter<Assignment, AssignmentProjection> {

        private final AssignmentQuestionProjectionConverter assignmentQuestionProjectionConverter;

        @Override
        public AssignmentProjection convert(Assignment from) {
            return AssignmentProjection.builder()
                    .id(from.getId())
                    .name(from.getName())
                    .description(from.getDescription())
                    .dueDate(from.getDueDate())
                    .startDate(from.getStartDate())
                    .questions(from.getQuestions().stream().map(assignmentQuestionProjectionConverter::convert).toList())
                    .timeLimitMinutes(from.getTimeLimitMinutes())
                    .maxAttempts(from.getMaxAttempts())
                    .build();
        }
}
