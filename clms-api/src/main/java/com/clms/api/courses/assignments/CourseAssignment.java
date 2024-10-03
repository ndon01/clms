package com.clms.api.courses.assignments;

import com.clms.api.courses.members.CourseMemberId;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "course_assignments")
@Data
public class CourseAssignment {

    @EmbeddedId
    private CourseAssignmentId id;

}
