package com.clms.api.courses.members;

import com.clms.api.common.domain.User;
import com.clms.api.courses.Course;
import com.clms.api.courses.CourseRepository;
import com.clms.api.users.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseMemberInsertService {

    private final CourseRepository courseRepository;
    private final CourseMemberRepository courseMemberRepository;
    private final UserRepository userRepository;


    public void insertMembersByUserIdsAndCourseId(List<Integer> userIds, int courseId) {
        Course course = courseRepository.findById(courseId).orElse(null);
        if (course == null) {
            throw new IllegalArgumentException("Course not found");
        }

        List<User> users = new ArrayList<>();
        for (Integer userId : userIds) {
            User user = userRepository.findById(userId).orElse(null);
            if (user == null) {
                throw new IllegalArgumentException(String.format("User with id %d not found", userId));
            }
            users.add(user);
        }

        insertMembersByUserAndCourse(users, course);
    }


    public void insertMembersByUserAndCourse(List<User> users, Course course) {

        List<CourseMember> courseMembers = new ArrayList<>();
        for (User user : users) {
            CourseMember courseMember = new CourseMember();
            courseMember.setId(new CourseMemberId(user, course));
            courseMembers.add(courseMember);
        }
        courseMemberRepository.saveAll(courseMembers);
    }
}
