package com.clms.api.courses.api.projections.converters;

import com.clms.api.courses.api.Course;
import com.clms.api.common.interfaces.GenericConverter;
import com.clms.api.courses.api.projections.CourseProjection;
import org.springframework.stereotype.Service;

@Service
public class CourseProjectionConverter implements GenericConverter<Course, CourseProjection> {
    @Override
    public CourseProjection convert(Course from) {

        return null;
    }
}
