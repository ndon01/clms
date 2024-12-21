package com.clms.api.assignments;

import com.clms.api.courses.api.Course;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AssignmentRepository extends JpaRepository<Assignment, Integer> {
    List<Assignment> findAllByCourse(Course course);
}
