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
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class CourseModuleItemsRemoveService {

    private final CourseModuleItemRepository courseModuleItemRepository;

    @Transactional
    public void removeItems(List<Integer> itemIds) {
        itemIds.forEach(itemId -> {
            CourseModuleItemEntity courseModuleItem = courseModuleItemRepository.findById(itemId).orElse(null);
            if (courseModuleItem == null) {
                log.warn("Course module item with id {} not found", itemId);
                return;
            }

            courseModuleItemRepository.delete(courseModuleItem);
        });
    }
}
