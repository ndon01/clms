package com.clms.api.courses.members.projections;

import com.clms.api.common.interfaces.GenericConverter;
import com.clms.api.courses.api.projections.converters.CourseDetailsProjectionConverter;
import com.clms.api.courses.api.projections.converters.CourseProjectionConverter;
import com.clms.api.courses.members.CourseMember;
import com.clms.api.users.api.User;
import com.clms.api.users.api.projections.UserProjection;
import com.clms.api.users.api.projections.converters.UserProjectionConverter;
import com.google.common.base.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CourseMemberProjectionConverter implements GenericConverter<CourseMember, CourseMemberProjection> {
   private final GenericConverter<User, UserProjection> userProjectionConverter;
   private final CourseDetailsProjectionConverter courseDetailsProjectionConverter;
    @Override
    public CourseMemberProjection convert(CourseMember entity) {
        return CourseMemberProjection.builder()
                .course(courseDetailsProjectionConverter.convert(entity.getId().getCourse()))
                .user(userProjectionConverter.convert(entity.getId().getUser()))
                .isTutor(entity.isTutor())
                .build();
    }
}
