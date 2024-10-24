package com.clms.api.courses.members;

import com.clms.api.users.api.User;
import com.clms.api.courses.api.Course;
import com.clms.api.courses.CourseRepository;
import com.clms.api.users.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CourseMemberRemoveService {

    private final CourseRepository courseRepository;
    private final CourseMemberRepository courseMemberRepository;
    private final UserRepository userRepository;

    public void removeMemberByUserIdAndCourseId(int userId, int courseId) {
        Course course = courseRepository.findById(courseId).orElse(null);
        if (course == null) {
            throw new IllegalArgumentException("Course not found");
        }

        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            throw new IllegalArgumentException(String.format("User with id %d not found", userId));
        }

        CourseMember courseMember = courseMemberRepository.findById(new CourseMemberId(user, course)).orElse(null);
        if (courseMember == null) {
            throw new IllegalArgumentException("User is not a member of the course");
        }

        courseMemberRepository.delete(courseMember);
        courseMemberRepository.flush();
    }
}
