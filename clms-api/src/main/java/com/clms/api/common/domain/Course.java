package com.clms.api.common.domain;

import com.clms.api.assignments.Assignment;
import com.clms.api.common.domain.User;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@EqualsAndHashCode
@Entity
@Table(name="courses")
@Data
public class Course
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String description;
    //private int tutorId;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinTable(name ="course_members",
            joinColumns = @JoinColumn(name = "course_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    private List<User> members;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinTable(name ="course_assignments",
            joinColumns = @JoinColumn(name = "course_id"),
            inverseJoinColumns = @JoinColumn(name = "assignment_id"))
    private List<Assignment> assignments;
}
