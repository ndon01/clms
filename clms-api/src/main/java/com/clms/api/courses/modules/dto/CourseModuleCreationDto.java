package com.clms.api.courses.modules.dto;

import com.clms.api.courses.api.projections.CourseModuleProjection;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CourseModuleCreationDto {
    private Integer courseId;
    private CourseModuleProjection courseModule;
}
