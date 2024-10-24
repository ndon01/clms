package com.clms.api.courses.api.projections;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class CourseDetailsProjection {
    private int id;
    private String name;
    private String description;
}
