package com.clms.api.courses.modules;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseModuleItemRepository extends JpaRepository<CourseModuleItemEntity, Integer> {
    List<CourseModuleItemEntity> findAllByCourseModule(CourseModuleEntity courseModule);
}
