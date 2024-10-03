package com.clms.api.courses;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseMemberRepository extends JpaRepository<CourseMember, CourseMemberId> {
    // You can add custom query methods here if needed

    @Query(nativeQuery = true, value = "SELECT course_id FROM course_members WHERE user_id = ?1")
    List<Integer> getCourseIdsByUserId(int userId);
}
