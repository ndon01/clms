package com.clms.api.courses.assignments;

import com.clms.api.assignments.Assignment;
import com.clms.api.common.domain.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CourseAssignmentRepository extends JpaRepository<CourseAssignment, CourseAssignmentId> {

    Optional<CourseAssignment> findByAssignment(Assignment assignment);
}
