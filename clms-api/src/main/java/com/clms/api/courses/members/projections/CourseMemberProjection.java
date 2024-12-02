package com.clms.api.courses.members.projections;

import com.clms.api.courses.api.projections.CourseDetailsProjection;
import com.clms.api.courses.api.projections.CourseProjection;
import com.clms.api.courses.members.CourseMemberId;
import com.clms.api.users.api.projections.UserProjection;
import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CourseMemberProjection {
    private CourseDetailsProjection course;
    private UserProjection user;
    private boolean isTutor;
}
