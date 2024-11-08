package com.clms.api.courses.api.projections;

import com.clms.api.assignments.api.projections.AssignmentDetailsProjection;
import com.clms.api.courses.modules.CourseModuleEntity;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class CourseModuleItemProjection {
    private Integer id;
    private Integer itemOrder;
    private AssignmentDetailsProjection assignment;
}
