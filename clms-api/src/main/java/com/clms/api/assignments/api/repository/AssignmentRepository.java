package com.clms.api.assignments.api.repository;

import com.clms.api.assignments.api.entity.Assignment;
import com.clms.api.courses.api.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssignmentRepository extends JpaRepository<Assignment, Integer> {
    List<Assignment> findAllByCourseId(int courseId);
    List<Assignment> findAllByCourse(Course course);

}
