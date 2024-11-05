package com.clms.api.courses.modules.services;

import com.clms.api.courses.CourseRepository;
import com.clms.api.courses.api.Course;
import com.clms.api.courses.api.projections.CourseModuleProjection;
import com.clms.api.courses.api.projections.converters.CourseModuleProjectionConverter;
import com.clms.api.courses.modules.CourseModuleEntity;
import com.clms.api.courses.modules.CourseModuleRepository;
import com.clms.api.courses.modules.dto.CourseModuleCreationDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springdoc.api.OpenApiResourceNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class CourseModuleCreationService {

        private final CourseModuleRepository courseModuleRepository;
        private final CourseRepository courseRepository;
        private final CourseModuleProjectionConverter courseModuleProjectionConverter;

        public CourseModuleProjection createCourseModule(CourseModuleCreationDto courseModuleCreationDto) {
            Course course = courseRepository.findById(courseModuleCreationDto.getCourseId()).orElse(null);
            if (course == null) {
                log.error("Course with id {} not found", courseModuleCreationDto.getCourseId());
                throw new OpenApiResourceNotFoundException("Course with id " + courseModuleCreationDto.getCourseId() + " not found");
            }

            CourseModuleEntity courseModule = CourseModuleEntity.builder()
                    .title(courseModuleCreationDto.getCourseModule().getTitle())
                    .course(course)
                    .build();

            courseModuleRepository.save(courseModule);

            return courseModuleProjectionConverter.convert(courseModule);
        }
}
