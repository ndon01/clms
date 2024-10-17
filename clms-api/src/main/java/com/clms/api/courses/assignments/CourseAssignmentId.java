package com.clms.api.courses.assignments;

import com.clms.api.assignments.Assignment;
import com.clms.api.common.domain.User;
import com.clms.api.courses.Course;
import jakarta.persistence.Embeddable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import java.io.Serializable;

@Embeddable
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CourseAssignmentId implements Serializable {


    @ManyToOne
    @JoinColumn(name = "assignment_id")
    private Assignment assignment;

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;

    public CourseAssignmentId(Assignment myAssignment) {
        this.assignment = myAssignment;
    }
}