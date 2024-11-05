package com.clms.api.courses.api.projections.converters;

import com.clms.api.common.interfaces.GenericConverter;
import com.clms.api.courses.api.projections.CourseModuleProjection;
import com.clms.api.courses.modules.CourseModuleEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CourseModuleProjectionConverter implements GenericConverter<CourseModuleEntity, CourseModuleProjection> {

    private final CourseDetailsProjectionConverter courseDetailsProjectionConverter;

    @Override
    public CourseModuleProjection convert(CourseModuleEntity from) {
        return CourseModuleProjection.builder()
                .id(from.getId())
                .title(from.getTitle())
                .moduleOrder(from.getModuleOrder())
                .course(courseDetailsProjectionConverter.convert(from.getCourse()))
                .build();
    }
}
