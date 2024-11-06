package com.clms.api.courses.api.projections.converters;

import com.clms.api.assignments.api.projections.AssignmentDetailsProjection;
import com.clms.api.assignments.api.projections.converters.AssignmentDetailsProjectionConverter;
import com.clms.api.common.interfaces.GenericConverter;
import com.clms.api.courses.api.projections.CourseModuleItemProjection;
import com.clms.api.courses.api.projections.CourseModuleProjection;
import com.clms.api.courses.modules.CourseModuleEntity;
import com.clms.api.courses.modules.CourseModuleItemEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CourseModuleItemProjectionConverter implements GenericConverter<CourseModuleItemEntity, CourseModuleItemProjection> {

    private final AssignmentDetailsProjectionConverter assignmentDetailsProjectionConverter;

    @Override
    public CourseModuleItemProjection convert(CourseModuleItemEntity entity) {
        return CourseModuleItemProjection.builder()
                .id(entity.getId())
                .itemOrder(entity.getItemOrder())
                .assignment(assignmentDetailsProjectionConverter.convert(entity.getAssignment()))
                .build();
    }
}
