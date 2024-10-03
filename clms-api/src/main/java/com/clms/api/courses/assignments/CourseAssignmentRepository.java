package com.clms.api.courses.assignments;

import com.clms.api.assignments.Assignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseAssignmentRepository extends JpaRepository<CourseAssignment, CourseAssignmentId> {
}
