package com.clms.api.courses.modules.services;

import com.clms.api.assignments.api.entity.Assignment;
import com.clms.api.assignments.api.repository.AssignmentRepository;
import com.clms.api.courses.CourseRepository;
import com.clms.api.courses.modules.CourseModuleEntity;
import com.clms.api.courses.modules.CourseModuleItemEntity;
import com.clms.api.courses.modules.CourseModuleItemRepository;
import com.clms.api.courses.modules.CourseModuleRepository;
import com.clms.api.courses.modules.dto.CourseModuleAddAssignmentsDto;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class CourseModuleItemsInsertService {

    private final CourseRepository courseRepository;
    private final CourseModuleRepository courseModuleRepository;
    private final CourseModuleItemRepository courseModuleItemRepository;
    private final AssignmentRepository assignmentRepository;

    @Transactional
    public void insertAssignments(CourseModuleAddAssignmentsDto courseModuleAddAssignmentsDto) {
        CourseModuleEntity courseModule = courseModuleRepository.findById(courseModuleAddAssignmentsDto.getModuleId()).orElse(null);
        if (courseModule == null) {
            throw new RuntimeException("Course module not found");
        }

        courseModuleAddAssignmentsDto.getAssignmentIds().forEach(assignmentId -> {
            Assignment assignment = assignmentRepository.findById(assignmentId).orElse(null);
            if (assignment == null) {
                log.warn("Assignment with id {} not found", assignmentId);
                return;
            }

            courseModuleItemRepository.save(CourseModuleItemEntity.builder()
                    .courseModule(courseModule)
                    .assignment(assignmentRepository.findById(assignmentId).orElse(null))
                    .build());
        });
    }
}
