package com.clms.api.assignments.api.projections.converters;

import com.clms.api.assignments.api.entity.Assignment;
import com.clms.api.assignments.api.projections.AssignmentDetailsProjection;
import com.clms.api.common.interfaces.GenericConverter;
import org.springframework.stereotype.Service;

@Service
public class AssignmentDetailsProjectionConverter implements GenericConverter<Assignment, AssignmentDetailsProjection> {
    @Override
    public AssignmentDetailsProjection convert(Assignment from) {
        return AssignmentDetailsProjection
                .builder()
                .id(from.getId())
                .name(from.getName())
                .description(from.getDescription())
                .dueDate(from.getDueDate())
                .startDate(from.getStartDate())
                .build();
    }
}
