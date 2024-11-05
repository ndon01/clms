package com.clms.api.courses.api.projections;

import com.clms.api.courses.api.projections.CourseDetailsProjection;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class CourseModuleProjection {
    private Integer id;
    private String title;
    private CourseDetailsProjection course;
    private Integer moduleOrder;
}
