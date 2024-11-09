package com.clms.api.courses.modules.services;

import com.clms.api.courses.modules.CourseModuleEntity;
import com.clms.api.courses.modules.CourseModuleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class CourseModuleUpdateTitleService {

        private final CourseModuleRepository courseModuleRepository;

        public void updateCourseModuleTitle(Integer id, String title) {
            CourseModuleEntity courseModuleEntity = courseModuleRepository.findById(id).orElse(null);
            if (courseModuleEntity == null) {
                throw new IllegalArgumentException("Course module with id " + id + " not found");
            }

            courseModuleEntity.setTitle(title);

            courseModuleRepository.save(courseModuleEntity);
        }
}
