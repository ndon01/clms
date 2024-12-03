package com.clms.api.courses.members;

import com.clms.api.courses.api.Course;
import com.clms.api.courses.members.projections.CourseMemberProjection;
import lombok.RequiredArgsConstructor;
import org.springdoc.api.OpenApiResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

interface MergeService<F,T> {
    T merge(F from);
}

@Service
@RequiredArgsConstructor
public class CourseMemberMergeService implements MergeService<CourseMemberProjection, CourseMember> {

    private final CourseMemberRepository courseMemberRepository;
    public CourseMember merge(CourseMemberProjection from) {
        var cm = courseMemberRepository.getCourseMemberByCourseIdAndUserId(from.getCourse().getId(), from.getUser().getId());
        if (cm == null) {
            throw new OpenApiResourceNotFoundException("Course Member Not Found");
        }

        if (from.getTutor() != null && cm.isTutor() != from.getTutor().booleanValue()) {
            cm.setTutor(from.getTutor().booleanValue());
        }

        return cm;
    }
}
