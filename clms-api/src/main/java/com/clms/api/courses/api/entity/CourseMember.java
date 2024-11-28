package com.clms.api.courses.members;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "course_members")
@Data
public class CourseMember {

    @EmbeddedId
    private CourseMemberId id;

    // You can add any additional fields if needed, like a role in the course
    @Column(name = "is_tutor")
    private boolean isTutor;
}
