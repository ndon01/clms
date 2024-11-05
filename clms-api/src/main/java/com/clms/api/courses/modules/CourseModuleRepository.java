package com.clms.api.courses.modules;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseModuleRepository extends JpaRepository<CourseModuleEntity, Integer> {

    @Query(value = "SELECT * FROM course_modules WHERE course_id = :courseId", nativeQuery = true)
    List<CourseModuleEntity> findByCourseId(@Param("courseId") Integer courseId);

}

