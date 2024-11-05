package com.clms.api.courses.modules.services;

import com.clms.api.courses.api.projections.CourseModuleProjection;
import com.clms.api.courses.api.projections.converters.CourseModuleProjectionConverter;
import com.clms.api.courses.modules.CourseModuleEntity;
import com.clms.api.courses.modules.CourseModuleRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CourseModuleUpdateService {

    private final CourseModuleRepository courseModuleRepository;
    private final CourseModuleProjectionConverter courseModuleProjectionConverter;

    public CourseModuleProjection updateCourseModule(CourseModuleProjection courseModuleProjection) {
        CourseModuleEntity courseModuleEntity = courseModuleRepository.findById(courseModuleProjection.getId()).orElse(null);
        if (courseModuleEntity == null) {
            throw new IllegalArgumentException("Course module with id " + courseModuleProjection.getId() + " not found");
        }

        callIfPresent(() -> {
            if (!courseModuleProjection.getTitle().equals(courseModuleEntity.getTitle())) {
                courseModuleEntity.setTitle(courseModuleProjection.getTitle());
            }
        }, courseModuleProjection.getTitle());

        callIfPresent(() -> {
            if (!courseModuleProjection.getModuleOrder().equals(courseModuleEntity.getModuleOrder())) {
                courseModuleEntity.setModuleOrder(courseModuleProjection.getModuleOrder());
            }
        }, courseModuleProjection.getModuleOrder());

        courseModuleRepository.save(courseModuleEntity);

        return courseModuleProjectionConverter.convert(courseModuleEntity);
    }

    @Transactional
    public List<CourseModuleProjection> updateCourseModules(List<CourseModuleProjection> courseModuleProjections) {
        return courseModuleProjections.stream()
                .map(this::updateCourseModule)
                .collect(Collectors.toList());
    }

    private void callIfPresent(Runnable runnable, Object object) {
        if (object != null) {
            runnable.run();
        }
    }
}
