package com.clms.api.courses.api.projections.converters;

import com.clms.api.courses.api.Course;
import com.clms.api.common.web.projections.GenericProjectionConverter;
import com.clms.api.courses.api.projections.CourseDetailsProjection;
import org.springframework.stereotype.Service;

@Service
public class CourseDetailsProjectionConverter implements GenericProjectionConverter<Course, CourseDetailsProjection> {
    @Override
    public CourseDetailsProjection convert(Course course) {
        return CourseDetailsProjection
                .builder()
                .id(course.getId())
                .name(course.getName())
                .description(course.getDescription())
                .build();
    }
}