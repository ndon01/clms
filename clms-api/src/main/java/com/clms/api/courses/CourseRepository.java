package com.clms.api.courses;

import com.clms.api.courses.api.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CourseRepository extends JpaRepository<Course, Integer> {

    Optional<Course> findByNameEqualsIgnoreCase(String courseName);
}
