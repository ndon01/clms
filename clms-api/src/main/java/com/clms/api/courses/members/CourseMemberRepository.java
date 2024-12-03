package com.clms.api.courses.members;

import com.clms.api.users.api.User;
import com.clms.api.courses.api.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CourseMemberRepository extends JpaRepository<CourseMember, CourseMemberId> {
    // You can add custom query methods here if needed

    @Query(nativeQuery = true, value = "SELECT course_id FROM course_members WHERE user_id = ?1")
    List<Integer> getCourseIdsByUserId(int userId);

    @Query("SELECT cm.id.course FROM CourseMember cm WHERE cm.id.user = ?1")
    List<Course> getCoursesByUser(User user);

    @Query(nativeQuery = true, value = "select * from course_members where course_id = ?1 and user_id = ?2")
    CourseMember getCourseMemberByCourseIdAndUserId(int courseId, int userId);

    @Query("SELECT cm FROM CourseMember cm WHERE cm.id.course = ?1 AND cm.id.user = ?2")
    Optional<CourseMember> findCourseMemberByCourseAndUser(Course course, User user);

    @Query(nativeQuery = true, value = "select * from course_members where course_id = ?1")
    List<CourseMember> getCourseMembersByCourseId(int courseId);


}
