package com.clms.api.courses.api.projections;

import com.clms.api.courses.api.Course;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class CourseProjection extends Course {
    private int id;
    private String name;
    private String description;
}

