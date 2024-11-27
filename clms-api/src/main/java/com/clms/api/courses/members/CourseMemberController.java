package com.clms.api.courses.members;

import com.clms.api.common.security.currentUser.CurrentUser;
import com.clms.api.courses.ClientCourseMemberDetailsProjection;
import com.clms.api.courses.CourseRepository;
import com.clms.api.courses.api.Course;
import com.clms.api.courses.members.projections.CourseMemberProjection;
import com.clms.api.courses.members.projections.CourseMemberProjectionConverter;
import com.clms.api.users.api.User;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/courses/members")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Course", description = "Endpoints for managing courses")
public class CourseMemberController {
    private final CourseRepository courseRepository;
    private final CourseMemberRepository courseMemberRepository;
    private final CourseMemberProjectionConverter courseMemberProjectionConverter;
    @Data
    private class CourseMembersRequest {
        private int courseId;
    }

    @GetMapping("/getCourseMembers")
    public List<CourseMemberProjection> getCourseMembers(CourseMembersRequest request) {
        Course currentCourse = courseRepository.findById(request.getCourseId()).orElse(null);
        if (currentCourse == null) {
            return null;
        }

        List<CourseMember> courseMembers = courseMemberRepository.getCourseMembersByCourseId(request.getCourseId());

        return courseMembers.stream().map(courseMemberProjectionConverter::convert).collect(Collectors.toList());
    }

    @GetMapping("getClientMembership")
    public ClientCourseMemberDetailsProjection getClientMembership(@CurrentUser User user, @RequestParam Integer courseId){
        CourseMember courseMember = courseMemberRepository.getCourseMemberByCourseIdAndUserId(courseId,user.getId());
        if(courseMember == null){
            return null;
        }
        return ClientCourseMemberDetailsProjection.builder()
                .courseId(courseMember.getId().getCourse().getId())
                .userId(courseMember.getId().getUser().getId())
                .isTutor(courseMember.isTutor())
                .build();
    }
}
