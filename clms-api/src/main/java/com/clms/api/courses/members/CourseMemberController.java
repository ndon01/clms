package com.clms.api.courses.members;

import com.clms.api.authorization.AuthorizationService;
import com.clms.api.authorization.Role;
import com.clms.api.authorization.roles.RolesController;
import com.clms.api.common.security.CurrentUserContextHolder;
import com.clms.api.common.security.currentUser.CurrentUser;
import com.clms.api.courses.ClientCourseMemberDetailsProjection;
import com.clms.api.courses.CourseRepository;
import com.clms.api.courses.api.Course;
import com.clms.api.courses.members.projections.CourseMemberProjection;
import com.clms.api.courses.members.projections.CourseMemberProjectionConverter;
import com.clms.api.users.UserService;
import com.clms.api.users.api.User;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springdoc.api.OpenApiResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import software.amazon.awssdk.services.s3.endpoints.internal.Value;

import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

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
        if(courseMember == null && user.getRoles().stream().noneMatch(r -> r.getName() == "Admin")){
            return null;
        }
        return ClientCourseMemberDetailsProjection.builder()
                .courseId(courseMember.getId().getCourse().getId())
                .userId(courseMember.getId().getUser().getId())
                .isTutor(courseMember.isTutor())
                .build();
    }

    private final CourseMemberMergeService courseMemberMergeService;
    @PostMapping("/merge")
    public ResponseEntity updateCourseMember(@CurrentUser User user, @RequestBody CourseMemberProjection courseMemberProjection) {
        var cm = courseMemberMergeService.merge(courseMemberProjection);
        requiresTutor(cm.getId().getCourse(), user);
        courseMemberRepository.save(cm);
        return ResponseEntity.ok().build();
    }
    private final AuthorizationService authorizationService;
    private void requiresTutor(Course course, User user) {
        if (user.getRoles().stream().anyMatch(role -> role.getName().equalsIgnoreCase("admin"))) {
            return;
        }
        var cm = courseMemberRepository.findCourseMemberByCourseAndUser(course, user).orElse(null);
        if ((cm == null || cm.isTutor() == false)) {
            throw new OpenApiResourceNotFoundException("Resource Not Found");
        }
    }
}
