package com.clms.api.courses.modules.services;

import com.clms.api.assignments.Assignment;
import com.clms.api.assignments.AssignmentRepository;
import com.clms.api.courses.CourseRepository;
import com.clms.api.courses.modules.CourseModuleEntity;
import com.clms.api.courses.modules.CourseModuleItemEntity;
import com.clms.api.courses.modules.CourseModuleItemRepository;
import com.clms.api.courses.modules.CourseModuleRepository;
import com.clms.api.courses.modules.dto.CourseModuleAddAssignmentsDto;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springdoc.api.OpenApiResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class CourseModuleItemsSearchService {

    private final CourseRepository courseRepository;
    private final CourseModuleRepository courseModuleRepository;
    private final CourseModuleItemRepository courseModuleItemRepository;
    private final AssignmentRepository assignmentRepository;

    public List<CourseModuleItemEntity> findByCourseModule(CourseModuleEntity courseModule) {
        return courseModuleItemRepository.findAllByCourseModule(courseModule);
    }

    public List<CourseModuleItemEntity> findByCourseModuleId(Integer courseModuleId) {
        CourseModuleEntity courseModule = courseModuleRepository.findById(courseModuleId).orElse(null);
        if (courseModule == null) {
            throw new OpenApiResourceNotFoundException("Course module not found");
        }
        return findByCourseModule(courseModule);
    }
}
